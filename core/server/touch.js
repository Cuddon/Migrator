touch = function (collection, id) {
    /*
     *   Update the updatedBy and updatedAt values for a record
     *   Analogous to linux 'touch' command
     *   If an error occurs does nothing and fails silently without an error message
     *
     *   collection: A MongoDb Collection
     *   id: a MongoDB record _id
     *
     *   Returns true on success, false otherwise
     * */

    if (!Meteor.userId()) {
        return false;
    }

    // Check if the current user is the owner or has been shared the model
    //todo: Identify if the model is shared and request different permissions
    var rec = collection.findOne(id);
    if (!(rec.ownerId === Meteor.userId() || rec.sharedToId === Meteor.userId())) {
        return false;
    }

    // Check that all attributes are of the correct type
    check(collection, Mongo.Collection);
    check(id, String);

    // Ensure mandatory fields have been completed
    if (!collection || !id) {
        return false;
    }

    collection.update({_id: id}, {
        $set: {updatedBy: Meteor.userId(), updatedAt: new Date()}
    }, function (error, docsUpdated) {
        if (error) {
            console.log("Unable to touch record. Please contact your administrator.");
            return false;
        } else {
            if (docsUpdated === 1) {
                // The number of updated documents should be one
                return true;
            } else if (docsUpdated === 0) {
                console.log("Record " + id + " does not exist so cannot be updated (" + docsUpdated + ").");
                return false;
            } else {
                // More than one matching project found
                console.log("Record " + id + " appears to exist more than once (" + docsUpdated + ").");
                return false;
            }
        }
    });
};
