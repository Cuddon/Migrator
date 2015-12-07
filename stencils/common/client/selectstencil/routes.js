/**
 *  Route: select a step stencil for a new step within a model
 */

// Router.go('selectStencil', {projectId: projectId, modelId: modelId});

Router.route('/project/:projectId/model/:modelId/addStep/selectStencil', {

    name: 'selectStencil',

    subscriptions:  function () {
        return [
            Meteor.subscribe("stencils")
        ];
    },

    data: function() {
        return {
            //stencilCategories: StencilsCollection.aggregate([ { $group : { _id : "$categgory" } } ] ),
            stencils: StencilsCollection.find({}, {sort: {category: 1, name: 1}})
        };
    },

    action: function() {
        // Render the template into the content area
        if (Meteor.userId()) {
            this.render('selectStencil', {to: 'content'});
            Session.set('activity', "Select a step stencil");
        } else {
            alert ("You must be logged in.");
            this.render('Home', {to: 'content'});
            Session.set('activity', "Home");
        }
    }
});




