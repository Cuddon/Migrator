/*
 * 'step' publications
 */

// Publish all steps for the selected model
// steps must be owned by the user or shared to him/her by another user
Meteor.publish("steps", function (modelId) {
    //Check that the user is logged in
    // this.userId is null if no user is logged in
    if (!this.userId) {
        // User is not logged in so do not return anything
        return [];
    }
    check(this.userId, String);
    check(modelId, String);

    return StepsCollection.find({
        modelId: modelId,
        $or: [
            {ownerId: this.userId},
            {sharedToId: this.userId}
        ]
    });
});

//TODO: Are there any step fields that should be hidden from the client?
