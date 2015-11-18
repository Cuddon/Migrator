/*

 Publish server database record sets

 Use Meteor.publish and Meteor.subscribe to control what documents flow from the server to its clients

 Meteor servers can publish sets of documents with Meteor.publish, and clients can subscribe to those publications with Meteor.subscribe. Any documents the client subscribes to will be available through the find method of client collections.

 Clients call Meteor.subscribe to express interest in document collections published by the server. Clients can further filter these collections of documents by calling collection.find(query). Whenever any data that was accessed by a publish function changes on the server, the publish function is automatically rerun and the updated document collections are pushed to the subscribed client.
*/

//TODO: Are there any model fields that should be hidden from the client?

// Publish all projects owned by the user or shared to them by another user
Meteor.publish("projects", function () {
    //Check that the user is logged in
    // this.userId is null if no user is logged in
    if (!this.userId) {
        // User is not logged in so do not return anything
        return [];
    }
    check(this.userId, String);

    return ProjectsCollection.find({
        $or: [
            {ownerId: this.userId},
            {sharedToId: this.userId}
        ]
    });
});

