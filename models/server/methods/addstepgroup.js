/**
 * Add an extra step group
 */

Meteor.methods({
    addStepGroup: function (modelId) {
        // Add an additional step group to the model (used for categorising/sorting steps)

        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to update a model.");
        }

        // Check if the user has permission to add step groups
        if (!Meteor.call('checkForPermission', 'model-add-step-group')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to add an additional step group.");
        }

        // Check if the current user is the owner or has been shared the model
        //todo: Identify if the model is shared and request different permissions
        var m = ModelsCollection.findOne(modelId);
        if ( !(m.ownerId === Meteor.userId() || m.sharedToId === Meteor.userId()) ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have sufficient ownership to add an additional step group.");
        }

        // Check that all attributes are of the correct type
        check(modelId, String);

        // Ensure mandatory fields have been completed
        if (!modelId) {
            throw new Meteor.Error('Error', "Missing model ID.");
        }

        // Update additional server-side attributes
        ModelsCollection.update({_id: modelId}, { $push: { stepGroups: "New step group" }
        }, function (error, docsUpdated) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to add an additional step group. Please contact your administrator.");
            } else {
                if (docsUpdated === 1) {
                    // The number of updated documents should be one
                    console.log('Additional Step Group added for Model ' + modelId + ' by user ' + Meteor.userId() + ' at ' + new Date());
                    return true;
                } else if (docsUpdated === 0) {
                    // Project not found so could not be updated
                    throw new Meteor.Error("database-error", "Model " + modelId +" does not exist so cannot be updated ("+ docsUpdated +").");
                } else {
                    // More than one matching project found
                    throw new Meteor.Error("database-error", "Model " + modelId +" appears to exist more than once ("+ docsUpdated +").");
                }
            }
        });

        touch(ModelsCollection, modelId);
    }
});


