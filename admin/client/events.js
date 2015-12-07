/**
 * Admin events
 */


Template.admin.events({

    // Register Stencil button is clicked, go back to models list for the project
    "click .register-stencils-button ": function () {
        // Add the new model to the database using a server method

        Meteor.call('adminRegisterStencils', function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason)
            } else {
                // Success
                alert("Done!");
            }
        });

        // Prevent default form action
        return false;
    },


    // Cancel button is clicked, go back to models list for the project
    "click .cancel-button ": function () {
        history.back();

        // Prevent default form action
        return false;
    }
});

