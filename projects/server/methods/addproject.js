/**
 * Add a new project
 */

Meteor.methods({
    addProject: function (project) {

        // Check if user is logged in
        if (!Meteor.userId()) {
            // User not logged in
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to add a new project.");
        }

        // Check if the user has permission to add projects
        if (! Meteor.call('checkForPermission', 'project-add') ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to add projects.");
        }

        // Check that all attributes are of the correct type
        check(project, {
            name: String,
            description: String,
            notes: String,
            image: String
        });

        // Ensure mandatory fields have been completed
        if (!project.name) {
            throw new Meteor.Error('mandatory fields', "A project name is mandatory.");
        }

        // Set a default logo
        if (!project.image) {
            project.image = "http://lorempixel.com/336/200/abstract";     // Default project logo. 320x200px
        }

        // Add additional fields (server use only, never transmitted to a client)
        project.ownerId = Meteor.userId();      // Logged in user is the initial owner
        project.sharedToId = null;              // The project is not shared to anyone yet
        project.createdAt = new Date();         // current date/time
        project.createdBy = Meteor.userId();    // Always the user who initially created the project
        // _id is automatically created by MongoDB

        // Save the new project
        ProjectsCollection.insert(project, function (error, _id) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('addProject', "Unable to add a new project. Please contact your administrator.");
            } else {
                console.log('Project ' + _id + ' created by user ' + Meteor.userId() + ' at ' + new Date());
                // return the _id of the newly created project
                return _id;
            }
        });
    }
});

