/**
 *
 */



Template.sideNav.helpers({

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
    }
});
