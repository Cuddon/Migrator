/**
 *
 */



Template.projectNav.helpers({

    project: function () {
        var projectId = Session.get('project');
        if (projectId){
            return ProjectsCollection.findOne({_id: projectId});
        }
    },
    
    model: function () {
        var modelId = Session.get('model');
        if (modelId){
            return ModelsCollection.findOne({_id: modelId});
        }
    },

    step: function () {
        var stepId = Session.get('step');
        if (stepId){
            return StepsCollection.findOne({_id: stepId});
        }
    },


    isDisabled: function (type) {
        var projectId = Session.get('project');
        var modelId = Session.get('model');
        var stepId = Session.get('step');

        if (type == 'project' && !projectId) {
            // No current project so disable it
            return "disabled";
        } else if (type == 'model' && (!projectId || !modelId)) {
            // No current project or model so disable it
            return "disabled";

        } else if (type == 'step' && (!projectId || !modelId || !stepId)) {
            // No current project, model, or step so disable it
            return "disabled";

        } else {
            // valid project, model, or step so keep it enabled
            return null;
        }
    }

});
