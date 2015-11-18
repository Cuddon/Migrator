/**
 * Edit a step - route controller
 */

// Edit a project's details
Router.route('/project/:projectId/model/:modelId/step/:_id/edit', {

    name: 'editStep',

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
            Meteor.subscribe("steps", modelId)
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
            this.render('editStep', {to: 'content'});
            Session.set('activity', "Edit step");
        } else {
            alert("You must be logged in to edit a step");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
        }
    }
});


