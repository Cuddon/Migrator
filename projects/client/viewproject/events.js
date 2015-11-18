/**
 * View a project
 * Add a new model
 */


Template.viewProject.events({

    // Back button is clicked, go back to the previous screen (typically the user's projects list)
    "click .back-button": function () {
        // Go back to previous screen
        //history.back();
        Router.go("projects");

        // Prevent default form action
        return false;
    },

    "click .toggle-notes-button": function () {
        // Toggle display/hide of notes

        Session.set("showNotes", !Session.get("showNotes"));
        // Prevent default form action
        return false;
    },

    // Notes field is updated
    "change #notes": function () {
       // alert("Not implemented");
        var project = {
            _id: this.project._id,
            notes: $('#notes').val()
        };

        // Update the notes using a server method
        Meteor.call('updateProjectNotes', project, function (error) {
            if (error) {
                // Display the error to the client
                showError(error.error, error.reason);
            }
        });

        // Prevent default form action
        return false;
    },


    // Edit button is clicked
    "click .edit-button": function () {
        //alert("Not implemented");
        var projectId = this.project._id;
        Router.go('/project/' + projectId + '/edit');

        // Prevent default form action
        return false;
    },

    // Clone button is clicked
    "click .clone-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },

    // Share button is clicked
    "click .share-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },

    // Share button is clicked
    "click .info-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },


    // Delete button is clicked
    "click .delete-button": function () {
        // TODO: Deleting a project should delete all models and steps
        // TODO: If no models then the confirmation should not be required

        var projectId = this.project._id;
        var conf = confirm("Please confirm.\nDo you want to delete project: " + this.project.name + ". \n\n***This will also delete all models and steps used by this project.***");
        if (conf === true) {
            conf = confirm("Are you really sure you want to delete project: " + this.project.name + ". \n\n***This will also delete all models and steps used by this project. This cannot be undone ***");
            if (conf === true) {
                // Double confirmation so delete the project and its models and steps
                Meteor.call('deleteProject', projectId, function (error) {
                    if (error) {
                        // Display the error to the client
                        showError(error.error, error.reason);
                    }
                    // Return to the projects list
                    Router.go("projects");
                });
            }
        }

        // Prevent default form action
        return false;
    }

});
