/**
 * Created by andrew on 24/08/2015.
 */

Template.signedIn.events({

    // Signout button is clicked
    "click .signout-button": function () {

        var conf = confirm("Please confirm.\nDo you want to sign out?");
        if (conf === true) {
            Meteor.logout(function (err) {
                if (err) {
                    console.error("Error logging out: " + err.error);
                }

            });
        }
        // Prevent default form action
        return false;
    }

});

Template.signedOut.events({

    // Register button is clicked
    "click .register-button": function () {

        // Validate new user details
        // Create user account

        // Set user's name (not unique and can be changed like Instagram)
        // Add in default account type
        // Set default permissions


        // Prevent default form action
        return false;
    }

});

