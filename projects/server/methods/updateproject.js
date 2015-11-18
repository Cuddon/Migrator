/**
 * Update a project
 */

Meteor.methods({
    updateProject: function (project) {
        // Save updates to a project

        // Check if user is logged in
        if (!Meteor.userId()) {
            // User not logged in
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to update a project.");
        }

        // Check if the current user is the owner or has been shared the project
        //todo: Identify if the project is shared and request different permissions
        var p = ProjectsCollection.findOne(project._id);
        if ( !(p.ownerId === Meteor.userId() || p.sharedToId === Meteor.userId()) ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have sufficient ownership to update this project.");
        }

        // Check if the user has permission to update a project
        if (! Meteor.call('checkForPermission', 'project-update') ) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to update projects.");
        }

        // Check that all attributes are of the correct type
        check(project, {
            _id: String,
            name: String,
            description: String,
            notes: String,
            image: String,
            // Optional, but if present must be an array of strings.
            sharedToId: Match.Optional([String])
        });

        // Ensure mandatory fields have been completed
        if (!project._id) {
            throw new Meteor.Error('Error', "Missing project ID.");
        }
        if (!project.name) {
            throw new Meteor.Error('mandatory fields', "A project name is mandatory.");
        }

        // Update additional server-side attributes
        project['updatedBy'] = Meteor.userId();
        project['updatedAt'] = new Date();    // Date/Time

        // Never update the details of the original creator, so remove them if they exist
        delete project.createdAt;
        delete project.createdBy;

        // Extract the project ID and remove the id attribute from the project object
        var projectId = project._id;
        delete project._id;


        ProjectsCollection.update({_id: projectId}, {$set: project}, function (error, docsUpdated) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to update the project. Please contact your administrator.");
            } else {
                if (docsUpdated === 1) {
                    // The number of updated documents should be one
                    console.log('Project ' + projectId + ' updated by user ' + Meteor.userId() + ' at ' + new Date());
                    return true;
                } else if (docsUpdated === 0) {
                    // Project not found so could not be updated
                    throw new Meteor.Error("database-error", "Project " + projectId + " does not exist so cannot be updated (" + docsUpdated + ").");
                } else {
                    // More than one matching project found
                    throw new Meteor.Error("database-error", "Project " + projectId + " appears to exist more than once (" + docsUpdated + ").");
                }
            }
        });
    }
});
