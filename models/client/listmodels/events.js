/**
 * Created by Andrew on 8/06/2015.
 */

Template.listModels.events({

    // Add model button is clicked
    "click .add-model-button": function () {
        var projectId = this.project._id;

        //Open the selected model view/edit template
        Router.go('addModel', {projectId: projectId});

        // Prevent default form submit
        return false;
    }
});


Template.modelItem.events({

    // A model card item is clicked
    "click .model-item": function () {
        var modelId = this._id;
        var projectId = this.projectId;

        // Open the selected model
        Router.go('model', {projectId: projectId, _id: modelId});

        // Prevent default form submit
        return false;
    }
});
