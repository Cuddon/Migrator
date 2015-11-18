/**
 * Created by Andrew on 8/06/2015.
 */

Template.listSteps.events({

    // Add Step button is clicked
    "click .add-step-button": function () {
        var projectId = this.model.projectId;
        var modelId = this.model._id;

        console.log(projectId, modelId);

        // Go to the addStep route
        Router.go('addStep', {
            projectId: projectId,
            modelId: modelId
        });

        // Prevent default form submit
        return false;
    }
});


Template.stepItem.events({

    // A step card item is clicked
    "click .step-item": function () {
        var projectId = this.projectId;
        var modelId = this.modelId;
        var stepId = this._id;

        // Open the selected step
        Router.go('step', {projectId: projectId, modelId: modelId, _id: stepId});

        // Prevent default form submit
        return false;
    }
});
