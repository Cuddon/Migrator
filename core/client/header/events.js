/**
 * Created by Andrew on 30/05/2015.
 */

Template.header.events({
    "click .home-button": function () {
        Router.go("home");

        // Prevent default form action
        return false;
    },

    // Cancel button is clicked, go back to home page
    "click .back-button": function () {

        if (Router.current().route.getName() === 'projects') {
            Router.go("home");
        } else if (Router.current().route.getName() === 'project') {
            Router.go("projects");
        } else if (Router.current().route.getName() === 'addproject') {
            Router.go("projects");
        } else {
            // Otherwise just go back to the last page
            history.back();
        }

        // Prevent default form action
        return false;
    },

    "click .projects-button": function () {
        Router.go("projects");

        // Prevent default form action
        return false;
    },

    "click .profile-button": function () {
        Router.go("profile");

        // Prevent default form action
        return false;
    }


});

