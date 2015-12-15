/**
 * Routes: add a model to a project
 */

// Add a new step
// Router.go('addStep', {projectId: projectId, modelId: modelId});

Router.route('/project/:projectId/model/:modelId/addStep', {
    name: 'addStep',

    subscriptions:  function () {
        // This limits what is synced to minimongo on the client
        var projectId = this.params.projectId;
        //var modelId = this.params.modelId;

        return [
            // All projects owned by the user or shared to him/her
            // All models for the selected project
            Meteor.subscribe("projects"),
            Meteor.subscribe("models", projectId),
            Meteor.subscribe("stencils")
        ];
    },

    data: function() {
        // Set the data context for the template (client reads from the local minimongo DB)
        // Return the selected model and the name and id of the project it belongs to
        var projectId = this.params.projectId;
        var modelId = this.params.modelId;

        // Return the parent project and the parent model
        return {
            project: ProjectsCollection.findOne({_id: projectId}, {fields: {_id: 1, name: 1}}),
            model: ModelsCollection.findOne({_id: modelId})
        };
    },

    action: function() {
        // Render the template into the content area
        if (Meteor.userId()) {
            Session.set('activity', "Add a new step");
            this.render('addStep', {to: 'content'});

        } else {
            alert ("You must be logged in to add a new step");
            Session.set('activity', "Home");
            this.render('Home', {to: 'content'});
        }
    }
});
