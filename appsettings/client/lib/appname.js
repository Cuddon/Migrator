/**
 * Created by Andrew on 24/05/2015.
 */

Session.setDefault('appName', "shoolcha");
Session.setDefault('appDescription', "My First Meteor App by Andrew Cuddon");

document.title = Session.get("appName");


// Application name template helper
Template.registerHelper('appName', function () {
    return Session.get("appName");
});

