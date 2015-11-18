/**
 * Routes: add a model to a project
 */

// Add a new model for a specific project

Router.route('/project/:projectId/addmodel', {
    name: 'addModel',

    subscriptions:  function () {
        // This limits what the client can see (what is synced to the minimongo on the client)
        // This is just to get the project name into the template
        // The model details are saved to a models collection
        //return Meteor.subscribe("project", this.params.projectId);
        return Meteor.subscribe("projects");    // Subscribe to projects for the current user
    },

    data: function() {
        // Set the data context for the template
        // This is just to get the project name into the template
        // The new model details are saved to a new document in the models collection
        return {
          project: ProjectsCollection.findOne({_id: this.params.projectId},{fields: {_id: 1, name: 1}})
        }
    },

    action: function() {
        // Render the template into the content area
        if (Meteor.userId()) {
          this.render('addModel', {to: 'content'});
          Session.set('activity', "Add a new model");
        } else {
          alert ("You must be logged in to add a new model");
          this.render('Home', {to: 'content'});
          Session.set('activity', "Home");
        }
    }
});




