/**
 * addStep events
 */

Template.addStep.events({

    // Save the new step
    "submit": function (event) {

        var projectId = this.project._id;
        var modelId = this.model._id;

        // Insert a new document into the steps collection
        var step = {
            name: event.target.name.value,
            description: event.target.description.value,
            stencil: this.selectedStencil,
            stepGroup: Number(event.target.stepGroup.value),
            order: Number(event.target.order.value),
            image: event.target.imageUrl.value,
            projectId: projectId,
            modelId: modelId
        };

        if (step.name === "") {
            showError("Step Name", "This field is mandatory. Please enter a step name")
            return false;
        }

        // Add the new step to the database using a server method
        Meteor.call('addStep', step, function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason)
            } else {
                // Success, go back to displaying the parent model and it's list of steps
                Session.set("selectedStencil", null);
                Router.go("model", {projectId: projectId, _id: modelId});
            }
        });

        // Prevent default form submit
        return false;
    },


    "click .select-stencil-button ": function () {
        Router.go("selectStencil", {projectId: this.project._id, modelId: this.model._id});
    },

    // Cancel button is clicked, go back to models list for the project
    "click .cancel-button ": function () {
        var step = {
            name: $('#name').val(),
            description: $('#description').val(),
            stencil: Session.get('selectedStencil'),
            stepGroup: $('#stepGroup').val(),
            order: $('#order').val(),
            image: $('#imageUrl').val()
        };

        if (allTextItemsEmpty(step)) {
            // All inputs are empty so ok to cancel
            step.stepGroup = Number(step.stepGroup);
            step.order = Number(step.order);
            // Go back to the parent model and it's list of steps
            Session.set("selectedStencil", null);
            Router.go("model", {projectId: this.project._id, _id: this.model._id});
        } else {
            // At least one input has been entered so ask the user if they really want to cancel
            var conf = confirm("You have entered some information.\nDo you really want to cancel?");
            if (conf === true) {
                // User confirmed yes
                // // Success, go back to displaying the parent model and it's list of steps
                Session.set("selectedStencil", null);
                Router.go("model", {projectId: this.project._id, _id: this.model._id});
            } else {
                // User cancelled the action so do nothing
            }
        }

        // Prevent default form action
        return false;
    }
});


allTextItemsEmpty = function (obj) {
    /*
    *   Check if all text attributes of an object are empty
     */
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'string') {
                if (!(obj[prop] === "" || typeof obj[prop] === 'undefined')) {
                    // not empty
                    return false
                }
            }
        }
    }
    return true;
};