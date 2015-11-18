/*
 Core
 */


Meteor.startup(function () {
    // Anything we need to do in the client before much else happens
    if (Meteor.isClient) {
        // client startup code
        //showError("Error 1", "Here is the reason for error 1.");
        //showError("Error 2", "With a longer description than the first one.");

        Session.setDefault('activity', "Home");
        Session.setDefault('showNotes', false);
    }

    if (Meteor.isServer) {
        // Server startup code
    }
});






