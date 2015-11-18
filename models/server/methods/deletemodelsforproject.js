/**
 * Delete all models for a project
 */

deleteAllModelsForProject = function (projectId) {
    /*
        Deletes all models for a nominated project
        Ensures any steps within the models are also deleted
        Returns True on success, throws an error otherwise
     */

    var result = false;

    if (!Meteor.userId()) {
        // Raise an error and send it to the client
        throw new Meteor.Error("logged-out", "You must be logged in to delete models.");
    }

    // Check if the user has permission to delete models
    if (!Meteor.call('checkForPermission', 'model-delete')) {
        // Raise an error and send it to the client
        throw new Meteor.Error('not-authorised', "You do not have permission to delete models.");
    }

    // Check that all attributes are of the correct type
    check(projectId, String);

    // Ensure mandatory fields have been completed
    if (!projectId) {
        throw new Meteor.Error('Error', "Missing project ID, when deleting models");
    }


    // Find all the models for this project, iterate through them and delete any steps
    // Delete any (child) models first
    // Find all the models for this project, iterate through them and delete any models
    // Don't worry about any grandchild steps since the deleteModel method will take care of that
    var modelsToDelete = ModelsCollection.find({
        projectId: projectId
    });

    modelsToDelete.forEach(function(model){
        // Delete each model separately (will delete any steps if they exist)
        // An error is raised if any problems and the result is true upon success
        if (!Meteor.call('deleteModel', model._id)) {
            result = false;
            // TODO: Would be slightly more efficient if we could break out of the forEacg loopon the first error
        }
    });

    return result;
};

