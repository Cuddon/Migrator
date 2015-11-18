/**
 * Update the notes for a step
 */

Meteor.methods({
    updateStepNotes: function (step) {
        // Save updates to a step

        // Check if user is logged in
        if (!Meteor.userId()) {
            // User not logged in
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to update a step.");
        }

        // Check if the current user is the owner or has been shared the model
        //todo: Identify if the model is shared and request different permissions
        var s = StepsCollection.findOne(step._id);
        if ( !(s.ownerId === Meteor.userId() || s.sharedToId === Meteor.userId()) ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have sufficient ownership to update this step.");
        }

        // Check if the user has permission to update a step
        if (! Meteor.call('checkForPermission', 'step-update') ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to update steps.");
        }

        // Check that all attributes are of the correct type
        check(step, {
            _id: String,
            notes: String
        });

        // Ensure mandatory fields have been completed
        if (!step._id) {
            throw new Meteor.Error('Error', "Missing step ID.");
        }

        // Extract the project ID
        var stepId = step._id;

        StepsCollection.update({_id: stepId}, {$set: {notes: step.notes}}, function(error, docsUpdated) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to update the step. Please contact your administrator.");
            } else {
                if (docsUpdated === 1) {
                    // The number of updated documents should be one
                    console.log('Step ' + stepId + ' Notes updated by user ' + Meteor.userId() + ' at ' + new Date());
                    return true;
                } else if (docsUpdated === 0) {
                    // Project not found so could not be updated
                    throw new Meteor.Error("database-error", "Step " + stepId + " does not exist so cannot be updated (" + docsUpdated + ").");
                } else {
                    // More than one matching project found
                    throw new Meteor.Error("database-error", "Step " + stepId + " appears to exist more than once (" + docsUpdated + ").");
                }
            }
        });
    }
});

