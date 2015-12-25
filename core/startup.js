/*
 Core
 */


Meteor.startup(function () {

    // Client Startup code
    if (Meteor.isClient) {

        Session.setDefault('activity', "Home");
        Session.setDefault('showNotes', false);

        Session.setDefault('project', null);
        Session.setDefault('model', null);
        Session.setDefault('step', null);

    }


    // Server startup code
    if (Meteor.isServer) {
        // Nothing yet
    }
});
