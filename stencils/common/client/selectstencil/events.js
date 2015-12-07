/**
 * selectStencil events
 */

Template.selectStencil.events({

    "click .select-stencil-button ": function () {
        // Select the stencil and go back to the model
        Session.set("selectedStencil", this._id);
        Router.go("addStep", {projectId: Router.current().params.projectId, modelId: Router.current().params.modelId});

        // Prevent default form action
        return false;
    },

    // Cancel button is clicked, go back to models list for the project
    "click .cancel-button ": function () {
        Router.go("addStep", {projectId: Router.current().params.projectId, modelId: Router.current().params.modelId});

        // Prevent default form action
        return false;
    }
});

