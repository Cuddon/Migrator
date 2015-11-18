/**
 * View a project - routes
 */

// View/edit a single project and it's models
Router.route('/project/:_id', {
    name: 'project',

    subscriptions: function () {
        // This limits what the client can see (what is synced to the minimongo on the client)
        var projectId = this.params._id;
        return [
            // All projects owned by the user ot shared to him/her
            // All models for the selected project
            Meteor.subscribe("projects"),
            Meteor.subscribe("models", projectId)
        ]
    },

    data: function () {
        // Set the data context for the template
        // Returns the selected project and its models
        var projectId = this.params._id;

        // Return the project and all models within it
        return {
            project: ProjectsCollection.findOne({_id: projectId}),
            modelsList: ModelsCollection.find({projectId: projectId})
        }
    },

    action: function () {
        if (Meteor.userId()) {
            this.render('viewProject', {to: 'content'});
            Session.set('activity', "View a Project");
        } else {
            alert("You must be logged in to view a project");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
        }
    }
});


