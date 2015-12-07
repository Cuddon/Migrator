/**
 * Update a step
 */

Meteor.methods({
    updateStep: function (step) {
        // Save updates to a step

        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to update a step.");
        }

        // Check if the user has permission to update steps
        if (!Meteor.call('checkForPermission', 'step-update')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to update steps.");
        }

        // Check if the current user is the owner or has been shared the step
        //todo: Identify if the step is shared and request different permissions
        var s = StepsCollection.findOne(step._id);
        if ( !(s.ownerId === Meteor.userId() || s.sharedToId === Meteor.userId()) ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have sufficient ownership to update this step.");
        }

        // Check that all attributes are of the correct type
        check(step, {
            _id:  String,
            projectId:  String,
            modelId:  String,
            name: String,
            description: String,
            notes: String,
            order: Number,
            image: String
        });

        // Ensure mandatory fields have been completed
        if (!step._id) {
            throw new Meteor.Error('Error', "Missing step ID.");
        }
        if (!step.projectId) {
            throw new Meteor.Error('Error', "Missing project ID for step: " + step._id);
        }
        if (!step.modelId) {
            throw new Meteor.Error('Error', "Missing model ID for step: " + step._id);
        }
        if (!step.name) {
            throw new Meteor.Error('mandatory fields', "A step name is mandatory.");
        }

        // TODO: Save the step group index (not the text, so the group name can be edited easily

        // Update additional server-side attributes
        step['updatedBy'] = Meteor.userId();
        step['updatedAt'] = new Date();    // Date/Time

        // Never update the details of the original creator, so remove them if they exist
        delete step.createdAt;
        delete step.createdBy;


        // Extract the step ID and remove the id attribute from the update object
        var stepId = step._id;
        delete step._id;

        StepsCollection.update({_id: stepId}, {$set: step}, function (error, docsUpdated) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to update the step. Please contact your administrator.");
            } else {
                if (docsUpdated === 1) {
                    // The number of updated documents should be one
                    console.log('Step ' + stepId + ' updated by user ' + Meteor.userId() + ' at ' + new Date());
                    return true;
                } else if (docsUpdated === 0) {
                    // Project not found so could not be updated
                    throw new Meteor.Error("database-error", "Step " + stepId +" does not exist so cannot be updated ("+ docsUpdated +").");
                } else {
                    // More than one matching project found
                    throw new Meteor.Error("database-error", "Step " + stepId +" appears to exist more than once ("+ docsUpdated +").");
                }
            }
        });
    }
});
