/**
 * Route: List projects for a user
 */

// List projects for the current user
Router.route('/projects', {
    name: 'projects',

    subscriptions: function () {
        // Subscribe to all projects owned by the user
        return Meteor.subscribe("projects");
    },

    data: function () {
        // Set the data context fro the template
        // Returns all projects owned by or shared to teh current user
        // Most recent project is first
        return {
            projectsList: ProjectsCollection.find({}, {sort: {createdAt: -1}})
        };
    },

    action: function () {
        // Render the template into the content area
        if (Meteor.userId()) {
            this.render('listProjects', {to: 'content'});
            Session.set('activity', "List Projects");
        } else {
            alert("You must be logged in to view your projects");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
        }
    }
});
