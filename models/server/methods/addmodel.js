/**
 * Add a new model to a project
 */

Meteor.methods({
    addModel: function (model) {

        // Check if user is logged in
        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to add a new model.");
        }

        // Check if the user has permission to add models
        if (!Meteor.call('checkForPermission', 'model-add')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to add models.");
        }

        // Check that all attributes are of the correct type
        check(model, {
            projectId: String,
            name: String,
            description: String,
            notes: String,
            image: String
        });

        // Ensure mandatory fields have been completed
        if (!model.projectId) {
            throw new Meteor.Error('Error', "Missing project ID for new model.");
        }
        if (!model.name) {
            throw new Meteor.Error('mandatory fields', "A model name is mandatory.");
        }

        // Add additional info
        if (model.image.trim() === "") {
            model.image = "http://lorempixel.com/336/200/nature";     // Default model image
        }
        model.ownerId = this.userId;  // Logged in user is the initial owner
        model.sharedToId = null;          // The model is not shared to anyone yet
        model.createdAt = new Date();     // current time
        model.createdBy = this.userId; // Always the user who initially created the model
        // _id is automatically created by MongoDB

        ModelsCollection.insert(model, function (error, _id) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to add a new model. Please contact your administrator.");
            } else {
                console.log('Model ' + _id + ' created by user ' + Meteor.userId() + ' at ' + new Date());
                // return the _id of the newly created document
                return _id;
            }
        });
    }
});

