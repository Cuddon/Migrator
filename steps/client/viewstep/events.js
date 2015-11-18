/**
 * Created by Andrew on 7/06/2015.
 */


Template.viewStep.events({

    // Close button is clicked, go back to the project with it's models list
    'click .back-button': function () {
        var projectId = this.project._id;
        var modelId = this.model._id;

        // Return to the model
        Router.go('model', {projectId: projectId, _id: modelId});

        // Prevent default form action
        return false;
    },

    // Show note button clicked
    "click .toggle-notes-button": function () {
        // Toggle show/hide notes
        Session.set("showNotes", !Session.get("showNotes"));

        // Prevent default form action
        return false;
    },


    // Notes are edited
    "change #notes": function () {
        var step = {
            _id: this.step._id,
            notes: $('#notes').val()
        };

        // Update the notes using a server method
        Meteor.call('updateStepNotes', step, function (error) {
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
        // Edit the step
        Router.go('editStep', {projectId: this.step.projectId, modelId: this.step.modelId, _id: this.step._id});

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

        var conf = confirm("Please confirm.\nDo you want to delete step: " + this.step.name + ". \n\n***This cannot be undone.***");
        if (conf === true) {
            // Double confirmation so delete the step
            var self = this;
            Meteor.call('deleteStep', this.step._id, function (error) {
                if (error) {
                    // Display the error to the client
                    showError(error.error, error.reason);
                }
                // Return to the parent model
                Router.go('model', {projectId: self.step.projectId, _id: self.step.modelId});
            });

        }

        // Prevent default form action
        return false;
    }


});
