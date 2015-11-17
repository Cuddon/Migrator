/**
 * AddModel events
 */


Template.addModel.events({

    // Add model form is submitted
    "submit": function (event) {

        var projectId = this.project._id;

        // Insert a new document into the models collection
        var model = {
            name: event.target.name.value,
            description: event.target.description.value,
            notes: event.target.notes.value,
            image: event.target.imageUrl.value,
            projectId: projectId
        };

        if (model.name === "") {
            showError("Model Name", "This field is mandatory. Please enter a model name")
            return false;
        }


        // Add the new model to the database using a server method
        Meteor.call('addModel', model, function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason)
            } else {
                // Success
                Router.go("project", {_id: projectId});
            }
        });

        // Prevent default form submit
        return false;
    },


    // Cancel button is clicked, go back to models list for the project
    "click .cancel-button ": function () {
        var model = {
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        if (model.name === "" && model.description === "" && model.notes === "" && model.image === "") {
            // All inputs are empty so ok to cancel
            Router.go("/project/" + this.project._id);
        } else {
            // At least one input has been entered so ask the user if they really want to cancel
            var conf = confirm("You have entered some information.\nDo you really want to cancel?");
            if (conf === true) {
                // User confirmed yes so just go back to the models lists without saving the changes
                Router.go("/project/" + this.project._id);
            } else {
                // Do nothing
            }
        }

        // Prevent default form action
        return false;
    }
});

