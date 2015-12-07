/**
 * Register step stencil (Admin function only)
 *
 * Stencil overview configurations are stored as JSON
 * These must be loaded into a database, when a new database is set up or when additional step stencils are created
 */


Meteor.methods({

    adminRegisterStencils: function () {
        Assets.getText('stencils/list.json', function (err, data) {
            if (err) {
                // Error occurred reading the file
                console.log(err);
            } else {
                // Success
                data = JSON.parse(data);
                _.each(data, registerStencil);

            }
        })
    },

    // Register a single step stencil
    // Adds a new stencil or updates an existing one
    adminRegisterStencil: function (filename) {
        // path is the path to the step.json file
        registerStencil(filename);

    }

});


function registerStencil(filename){
    /*
    *   Registers a step stencil (saves overview details to the 'stencils' collection
    *       path is the path to the stencil overview file (.json format)
    *       {
    *           "_id" : "cK2xgojhcPMP6haw9",
    *           "category": "Parsers",
    *           "name": "Test Stencil",
    *           "description": "What the step does. Mxx 100 chars",
    *           "hoverText": " A longer description perhaps",
    *           "tags" : [],
    *           "version": "v0.0.0",
    *           "accounts": [100,1010]
     *      }
     *      If an _id exists in the stencil overview file then the step overwrites/updates any existing stencil of the same id
     *      If an _id does not exist in the stencil file then the stencil is added
     *
     */

    // Check if user is logged in
    if (!Meteor.userId()) {
        // Raise an error and send it to the client
        throw new Meteor.Error("logged-out", "You must be logged in to add a new step.");
    }

    // Check if the user has admin permission
    if (!Meteor.call('checkForPermission', 'stencil-register')) {
        // Raise an error and send it to the client
        throw new Meteor.Error('not-authorised', "You do not have permission to register a stencil.");
    }

    // Check that all attributes are of the correct type
    check(filename, String);

    // Ensure mandatory fields have been completed
    if (!filename) {
        throw new Meteor.Error('Error', "Register stencil: Missing filename.");
    }


    // load the stencil details from teh json file
    Assets.getText(filename, function (err, data) {
        if (err) {
            // Error occurred reading the file
            console.log(err);
        } else {
            // Success
            // Convert to a javascript object and insert/update into a Mongo Collection
            var details = JSON.parse(data);

            // If the document already exists update it, otherwise insert a new record
            // Query for identifying new records is name and version
            StencilsCollection.update({
                _id: details._id
            }, details, {upsert: true}, function (err, docs) {
                if (err) {
                    throw new Meteor.Error('Error', "Register stencil: " + filename + " | " + err);
                } else {
                    console.log("Stencil" + filename + " registered/updated: " + docs + "docs");
                }
            });

        }

    });

}