/**
 * Created by Andrew on 7/06/2015.
 */


Template.viewModel.events({

    // Close button is clicked, go back to the project with it's models list
    'click .back-button': function () {
        var projectId = this.project._id;

        Router.go("project", {_id: projectId});

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
        var model = {
            _id: this.model._id,
            notes: $('#notes').val()
        };

        // Update the notes using a server method
        Meteor.call('updateModelNotes', model, function (error) {
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
        // Edit the model details
        Router.go('editModel', {_id: this.model._id, projectId: this.model.projectId });

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
        alert("Not implemented");

        // TODO: Deleting a model should delete all of its steps
        // TODO: If no steps then the confirmation should not be required

        var modelId = this.model._id;
        var conf = confirm("Please confirm.\nDo you want to delete model: " + this.model.name + ". \n\n***This will also delete all steps used by this model.***");
        if (conf === true) {
            conf = confirm("Are you really sure you want to delete model: " + this.model.name + ". \n\n***This will also delete all steps used by this model. This cannot be undone ***");
            if (conf === true) {
                // Double confirmation so delete the model and its steps
                Meteor.call('deleteModel', modelId, function (error) {
                    if (error) {
                        // Display the error to the client
                        showError(error.error, error.reason);
                    }
                    // Return to the project
                    Router.go('project', {_id: this.project._id});
                });
            }
        }

        // Prevent default form action
        return false;
    }


});
