/**
 * Delete a model
 */

Meteor.methods({

    // Delete a single model
    deleteModel: function (modelId) {
        /*
            Delete a single model and any (sub) steps if they exist
            Returns True on success, raises an error otherwise
         */

        var result = false;

        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to delete a model.");
        }

        // Check if the user has permission to delete models
        if (!Meteor.call('checkForPermission', 'model-delete')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to delete models.");
        }

        // Check that all attributes are of the correct type
        check(modelId, String);

        // Ensure mandatory fields have been completed
        if (!modelId) {
            throw new Meteor.Error('Error', "Missing model ID.");
        }

        // Delete any (child) steps first
        // Find all the steps for this model, iterate through them and delete any steps
        var stepsToDelete = ModelsCollection.find({modelId: modelId});
        stepsToDelete.forEach(function(step){
            // Delete each step separately
            // An error is raised if any problems and the result is true upon success
            result = Meteor.call('deleteStep', step._id);
        });

        if (result) {
            // Delete the model itself only if its steps have been successfully deleted

            ModelsCollection.remove(modelId, function (error, docsRemoved) {
                if (error) {
                    // Raise an error and send it to the client
                    throw new Meteor.Error('database-error', "Unable to delete model: " + modelId);
                } else {
                    // Success
                    if (docsRemoved == 1) {
                        console.log('Model ' + modelId + ' deleted by user ' + Meteor.userId() + ' at ' + new Date());
                        result = true;
                    } else {
                        // model _Id not found or multiple models with the same id deleted (there should not be any)
                        throw new Meteor.Error('database-error', "Unable to delete model: " + modelId);
                    }
                }
                return result;  // Result show always be true since an error is raise if an error occurred
            });
        }
    }
});

