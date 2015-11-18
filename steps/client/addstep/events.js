/**
 * addStep events
 */


Template.addStep.events({

    // Add model form is submitted
    "submit": function (event) {

        var projectId = this.project._id;
        var modelId = this.model._id;

        // Insert a new document into the steps collection
        var step = {
            name: event.target.name.value,
            description: event.target.description.value,
            notes: event.target.notes.value,
            image: event.target.imageUrl.value,
            projectId: projectId,
            modelId: modelId
        };

        if (step.name === "") {
            showError("Step Name", "This field is mandatory. Please enter a step name")
            return false;
        }


        // Add the new model to the database using a server method
        Meteor.call('addStep', step, function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason)
            } else {
                // Success, go back to displaying the model and it's list of steps
                Router.go("model", {projectId: projectId, _id: modelId});
            }
        });

        // Prevent default form submit
        return false;
    },


    // Cancel button is clicked, go back to models list for the project
    "click .cancel-button ": function () {
        var step = {
            name: $('#name').val(),
            description: $('#description').val(),
            notes: $('#notes').val(),
            image: $('#imageUrl').val()
        };

        if (step.name === "" && step.description === "" && step.notes === "" && step.image === "") {
            // All inputs are empty so ok to cancel
            Router.go("model", {projectId: this.project._id, _id: this.model._id});
        } else {
            // At least one input has been entered so ask the user if they really want to cancel
            var conf = confirm("You have entered some information.\nDo you really want to cancel?");
            if (conf === true) {
                // User confirmed yes so just go back to the models lists without saving the changes
                Router.go("model", {projectId: this.project._id, _id: this.model._id});
            } else {
                // Do nothing
            }
        }

        // Prevent default form action
        return false;
    }
});

