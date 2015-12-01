/**
 * Created by Andrew on 7/06/2015.
 */


Template.editStep.events({

    // Save button is clicked
    'click .save-button': function () {

        var step = {
            _id:        this.step._id,
            projectId:  this.step.projectId,
            modelId:    this.step.modelId,
            name:       $('#name').val(),
            description: $('#description').val(),
            notes:      $('#notes').val(),
            order:      Number($('#order').val()),
            image:      $('#imageUrl').val()
        };

        var self = this;
        Meteor.call('updateStep', step, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error updating your step. Please try again');
            } else {
                // success
                // Return to viewing the step
                Router.go('step', {projectId: self.step.projectId, modelId: self.step.modelId, _id: self.step._id});
            }
        });

        // Prevent default form action
        return false;
    },


    // Close button is clicked, go back to the project with it's steps list
    'click .cancel-button': function () {
        // Original (saved in the database) and updated values
        var original = {
            name:   this.step.name,
            description: this.step.description,
            notes:  this.step.notes,
            order:  this.step.order,
            image:  this.step.image
        };
        var updated = {
            name:   $('#name').val(),
            description: $('#description').val(),
            notes:  $('#notes').val(),
            order:  Number($('#order').val()),
            image:  $('#imageUrl').val()
        };

        // Check if the user has changed anything
        if (!_.isEqual(original, updated)) {
            // Data has changed so ask the user if they really want to cancel
            var conf = confirm("Changes not saved.\nDo you really want to cancel your edits?");
            if (conf === true) {
                // User confirmed yes so just go back to viewing the step without saving the changes
                Router.go('step', {projectId: this.step.projectId, modelId: this.step.modelId, _id: this.step._id});
            }
        } else {
            // Data has not changed so return to viewing the step
            Router.go('step', {projectId: this.step.projectId, modelId: this.step.modelId, _id: this.step._id});
        }

        // Prevent default form action
        return false;
    }


});
