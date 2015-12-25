/**
 * Routes: View a STEP
 */

// View a step
// Router.go('step', {projectId: projectId, modelId: modelId, _id: stepId});

Router.route('/project/:projectId/model/:modelId/step/:_id', {
    name: 'step',

    subscriptions: function () {
        // This limits what is synced to minimongo on the client
        var projectId = this.params.projectId;
        var modelId = this.params.modelId;

        return [
            // All projects owned by the user or shared to him/her
            // All models for the selected project
            // All steps for the selected model
            Meteor.subscribe("projects"),
            Meteor.subscribe("models", projectId),
            Meteor.subscribe("steps", modelId),
            Meteor.subscribe("stencils")
        ];
    },

    data: function () {
        // Set the data context for the template (client reads from the local minimongo DB)
        // Return the selected model and the name and id of the project it belongs to
        var projectId = this.params.projectId;
        var modelId = this.params.modelId;
        var stepId = this.params._id;

        // Return the project name/id, the model name/id, and the step
        return {
            project: ProjectsCollection.findOne({_id: projectId}, {fields: {_id: 1, name: 1}}),
            model: ModelsCollection.findOne({_id: modelId}, {fields: {_id: 1, name: 1}}),
            step: StepsCollection.findOne({_id: stepId})
        };
    },

    action: function () {
        // Render the template into the content area
        if (Meteor.userId()) {
            this.render('viewStep', {to: 'content'});
            Session.set('activity', "View step");
            Session.set('step', this.params._id);
        } else {
            alert("You must be logged in to view a step");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
            Session.set('step', null);
        }
    }
});


