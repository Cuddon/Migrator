/**
 * Created by Andrew on 23/11/2015.
 */


Template.editModel.events({

    // Add a new step group button clicked
    'click .add-step-group-button': function() {

        var self = this;
        Meteor.call('addStepGroup', this.model._id, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error adding a new step group. Please try again');
            } else {
                // success
                // Return to editing the model
                Router.go('editModel', {_id: self.model._id, projectId: self.model.projectId});
            }
        });

        // Prevent default form action
        return false;
    },


    // Delete step group button clicked
    'click .delete-step-group-button': function(elem) {
        // Delete the selected step group
        // Remove any association with any steps
        // Reorder the other associations

        var selectedGroupIndex = parseInt(elem.currentTarget.id);
        //console.log(selectedGroupIndex);

        var self = this;
        Meteor.call('deleteStepGroup', this.model._id, selectedGroupIndex, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error deleting a step group. Please try again');
            } else {
                // Success. Return to editing the model
                Router.go('editModel', {_id: self.model._id, projectId: self.model.projectId});
            }
        });

        // Prevent default form action
        return false;
    },

    // Close button is clicked, go back to the project with it's models list
    'click .cancel-button': function () {
        // Original (saved in the database) and updated values
        var original = {
            name: this.model.name,
            description: this.model.description,
            notes: this.model.notes,
            order: this.model.order,
            stepGroups: this.model.stepGroups,
            image: this.model.image
        };
        var updated = {
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            order: Number($('#order').val()),
            stepGroups: $('.step-groups').map(function(){
                return $( this ).val();
            }).get(),
            image: $('#imageUrl').val()
        };

        // Check if the user has changed anything
        if (!_.isEqual(original, updated)) {
            // Data has changed so ask the user if they really want to cancel
            var conf = confirm("Changes not saved.\nDo you really want to cancel your edits?");
            if (conf === true) {
                // User confirmed yes so just go back to viewing the model without saving the changes
                Router.go('model', {_id: this.model._id, projectId: this.model.projectId});
            }
        } else {
            // Data has not changed so return to the model
            Router.go('model', {_id: this.model._id, projectId: this.model.projectId});
        }

        // Prevent default form action
        return false;
    },


    // Save button is clicked
    'click .save-button': function () {

        var model = {
            _id:    this.model._id,
            projectId:  this.model.projectId,
            name:   $('#name').val(),
            description: $('#description').val(),
            notes:  $('#notes').val(),
            order:  Number($('#order').val()),
            stepGroups: $('.step-groups').map(function(){
                return $( this ).val();
            }).get(),
            image:  $('#imageUrl').val()
        };

        var self = this;
        Meteor.call('updateModel', model, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error updating your model. Please try again');
            } else {
                // success
                // Return to viewing the model
                Router.go('model', {_id: self.model._id, projectId: self.model.projectId});
            }
        });

        // Prevent default form action
        return false;
    }


});
