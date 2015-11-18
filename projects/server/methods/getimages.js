/**
 * Get the list of project images, icons, logos
 */

Meteor.methods({
    getProjectImagesList: function () {
        if (!this.userId) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in.");
        }

        return settings.projectImages;
    }
});

