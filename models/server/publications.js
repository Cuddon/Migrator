/*
 * 'models' publication
 */

//TODO: Are there any model fields that should be hidden from the client?

// Publish ALL models for the selected project
// Models must be owned by the user or shared to him/her by another user
Meteor.publish("models", function (projectId) {
    //Check that the user is logged in
    // this.userId is null if no user is logged in
    if (!this.userId) {
        // User is not logged in so do not return anything
        return [];
    }
    check(this.userId, String);
    check(projectId, String);

    return ModelsCollection.find({
        projectId: projectId,
        $or: [
            {ownerId: this.userId},
            {sharedToId: this.userId}
        ]
    });
});

