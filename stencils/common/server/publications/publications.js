/*
 * 'stencil' publications
 */

//TODO: Are there any stencil fields that should be hidden from the client?


// List of available step stencils that a user may choose from
Meteor.publish("stencils", function () {

    //Check that the user is logged in
    if (!this.userId) {
        // User is not logged in so do not return anything
        this.ready();
    }

    // Return a details of all stencils.
    // Access on the client and in methods may depend on whether a user has an suitable account level
    return StencilsCollection.find({});

});
