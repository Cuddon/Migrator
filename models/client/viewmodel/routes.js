/**
 * Routes: View a MODEL
 */

// View a Model
// Router.go('model', {projectId: projectId, _id: modelId});

Router.route('/project/:projectId/model/:_id', {
    name: 'model',

    subscriptions: function () {
        // This limits what is synced to minimongo on the client
        var projectId = this.params.projectId;
        var modelId = this.params._id;

        return [
            // All projects owned by the user or shared to him/her
            // All models for the selected project
            // All steps for the selected model
            Meteor.subscribe("projects"),
            Meteor.subscribe("models", projectId),
            Meteor.subscribe("steps", modelId)
        ];
    },

    data: function () {
        // Set the data context for the template (client reads from the local minimongo DB)
        // Return the selected model and the name and id of the project it belongs to
        var projectId = this.params.projectId;
        var modelId = this.params._id;

        // Return the project, the model, and all the steps in that model
        return {
            project: ProjectsCollection.findOne({_id: projectId}, {fields: {_id: 1, name: 1}}),
            model: ModelsCollection.findOne({_id: modelId}),
            //stepsList: StepsCollection.find({modelId: modelId}, {sort: {stepGroup: 1, order: 1, createdAt: -1}})
            // stepsList is provided by a helper (for each step group)
        };
    },

    action: function () {
        // Render the template into the content area
        if (Meteor.userId()) {
            this.render('viewModel', {to: 'content'});
            Session.set('activity', "View model");
            Session.set('model', this.params._id);
        } else {
            alert("You must be logged in to view a model");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
            Session.set('model', null);
        }
    }
});


