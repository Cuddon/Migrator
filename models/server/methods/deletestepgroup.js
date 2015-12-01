/**
 * Delete an existing step group
 */

Meteor.methods({
    deleteStepGroup: function (modelId, group) {
        // Add an additional step group to the model (used for categorising/sorting steps)

        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to update a model.");
        }

        // Check if the user has permission to add step groups
        if (!Meteor.call('checkForPermission', 'model-delete-step-group')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to delete a step group.");
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
        check(group, Number);

        // Ensure mandatory fields have been completed
        if (!modelId || group < 0) {
            throw new Meteor.Error('Error', "Missing model ID. or step group");
        }

        // Remove the step group from the allowable groups list in the model
        var stepGroups = ModelsCollection.findOne(modelId).stepGroups;
        stepGroups.splice(group, 1);

        ModelsCollection.update({_id: modelId}, {$set: {stepGroups: stepGroups}
        }, function (error, docsUpdated) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to delete the step group. Please contact your administrator. " + error);
            } else {
                if (docsUpdated === 1) {
                    // The number of updated documents should be one
                    console.log('Step Group ' + group + ' deleted for Model ' + modelId + ' by user ' + Meteor.userId() + ' at ' + new Date());
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
