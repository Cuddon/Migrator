/**
 * Created by Andrew on 30/05/2015.
 */

Template.home.events({
    "click .view-details-button": function () {
        Router.go("/about");

        // Prevent default form action
        return false;
    }
});

