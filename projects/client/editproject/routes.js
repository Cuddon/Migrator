/**
 * Edit a project - route controlller
 */

// Edit a project's details
Router.route('/project/:_id/edit', {

    name: 'editproject',

    subscriptions: function () {
        // This limits what the client can see (what is synced to the minimongo on the client)
        var projectId = this.params._id;
        return [
            // All projects owned by the user or shared to him/her
            // All models for the selected project
            Meteor.subscribe("projects"),
        ]
    },

    data: function () {
        // Set the data context for the template
        // Returns the selected project and its models
        var projectId = this.params._id;
        return {
            project: ProjectsCollection.findOne({_id: projectId})
        };
    },

    action: function () {
        if (Meteor.userId()) {
            this.render('editProject', {to: 'content'});
            Session.set('activity', "Edit a Project");
        } else {
            alert("You must be logged in to edit a project");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
        }
    }
});


