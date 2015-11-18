/**
 * Created by Andrew on 7/06/2015.
 */


Template.editModel.events({

    // Close button is clicked, go back to the project with it's models list
    'click .cancel-button': function () {
        // Original (saved in the database) and updated values
        var original = {
            name: this.model.name,
            description: this.model.description,
            notes: this.model.notes,
            image: this.model.image
        };
        var updated = {
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        // Check if the user has changed anything
        if (!_.isEqual(original, updated)) {
            // Data has changed so ask the user if they really want to cancel
            var conf = confirm("Changes not saved.\nDo you really want to cancel your edits?");
            if (conf === true) {
                // User confirmed yes so just go back to viewing the model without saving the changes
                Router.go('/project/' + this.model.projectId + '/model/' + this.model._id);
            }
        } else {
            // Data has not changed so return to the model
            Router.go('/project/' + this.model.projectId + '/model/' + this.model._id);
        }

        // Prevent default form action
        return false;
    },


    // Save button is clicked
    'click .save-button': function () {

        var model = {
            _id: this.model._id,
            projectId:  this.project._id,
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        Meteor.call('updateModel', model, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error updating your model. Please try again');
            } else {
                // success
                // Return to viewing the model
                Router.go('/project/' + model.projectId + '/model/' + model._id);
            }
        });

        // Prevent default form action
        return false;
    }


});
