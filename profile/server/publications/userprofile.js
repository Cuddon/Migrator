/*
 * User profile publications
 */

/*
 Meteor automatically publishes a 'users' record set with the following standard fields
 _id: "McuEpMrCXbwZApa"
 emails: Array[1]
 profile: Object

 By default the 'profile' field can be updated by the client
 e.g. Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {name: "Fred Nerk"}}});

 Therefore, set a Deny rule so a client cannot make changes/updates to the user's profile
 Calls to server side methods must be used instead
 */

Meteor.users.deny({
    update: function () {
        return true;
    }
});


/*
 Publish additional (non-standard) fields from the user record.
 These fields are used by the client for Role Based Permissions and information display
 e.g. For showing a user their account type and offering to upgrade it
 */

// Publish a record set 'userProfile' from the built in Meteor.users collection (which does not need to be declared)
Meteor.publish("userProfile", function () {
    /*
     Publish the user profile from the user record
     client: Meteor.subscribe("userProfile");
     */

    if (this.userId) {
        // User is logged in
        check(this.userId, String);

        // Select a record only for the current user
        var selector = {_id: this.userId};

        // Publish only the user profile
        var options = {
            fields: {
                'profile': 1,
                'account.active': 1,
                'account.type': 1,
                'account.description': 1,
                'account.startDate': 1,
                'account.createdAt': 1,
                'roles': 1
            }
        };
        return Meteor.users.find(selector, options);
    } else {
        // User is not logged in so do not return anything
        this.ready();
    }
});

