/*
* About page events
* */

Template.about.events({

    // Back button is clicked, go back to the previous screen (typically the user's projects list)
    "click .back-button": function () {

        // Go back to previous screen
        history.back();

        // Prevent default form action
        return false;
    }
});
