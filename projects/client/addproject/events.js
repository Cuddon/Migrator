Template.addProject.events({

    // Add project form is submitted
    "submit": function (event) {
        // Insert a new document into the projects collection
        var project = {
            name: event.target.name.value,
            description: event.target.description.value,
            notes: event.target.notes.value,
            image: event.target.imageUrl.value
        };

        if (project.name === "") {
            showError("Project Name", "This field is mandatory. Please enter a project name")
            return false;
        }

        // Add the new project to the database using a server method
        Meteor.call('addProject', project, function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason);
            } else {
                // Success
                Router.go("projects");
            }
        });

        // Prevent default form submit
        return false;
    },


    // Cancel button is clicked, go back to projects list
    "click .cancel-button ": function () {
        var project = {
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        if (project.name === "" && project.description === "" && project.notes === "" && project.image === "") {
            // All inputs are empty so ok to cancel
            Router.go("projects");
        } else {
            // At least one input has been entered so ask the user if they really want to cancel
            var conf = confirm("You have entered some information.\nDo you really want to cancel?");
            if (conf === true) {
                // User confirmed yes so just go back to the projects lists without saving the changes
                Router.go('projects');
            } else {
                // Do nothing
            }
        }

        // Prevent default form action
        return false;
    }

});
