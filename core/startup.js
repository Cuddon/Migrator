/*
 Core
 */


Meteor.startup(function () {

    // Client Startup code
    if (Meteor.isClient) {

        Session.setDefault('activity', "Home");
        Session.setDefault('showNotes', false);
    }


    // Server startup code
    if (Meteor.isServer) {
        // Nothing yet
    }
});
