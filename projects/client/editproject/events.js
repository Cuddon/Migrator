/**
 * View/edit a project
 * Add a new model
 */


Template.editProject.events({

    // Back button is clicked, go back to the previous screen (typically the user's projects list)
    "click .cancel-button": function () {

        // Original (saved in the database) and updated values
        var original = {
            name: this.project.name,
            description: this.project.description,
            notes: this.project.notes,
            image: this.project.image
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
                // User confirmed yes so just go back to viewing the project without saving the changes
                Router.go('/project/' + this.project._id);
            }
        } else {
            // Data has not changed so return to the project
            Router.go('/project/' + this.project._id);
        }

        // Prevent default form action
        return false;
    },


    // Save button is clicked
    "click .save-button": function () {

        var project = {
            _id: this.project._id,
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        // Call the server method to update the project
        Meteor.call('updateProject', project, function (error, result) {
            if (error) {
                showError(error.error, error.reason);
            } else if (result === false) {
                showError("database-error", 'Error updating your project. Please try again');
            } else {
                // success
                Router.go('/project/' + project._id);
            }
        });

        // Prevent default form action
        return false;
    }

});
