/*
* Client side security tests
*
* */

/*
 **** User Record ****
*/

/*
    Get all users
    Do this after multiple users have logged in and out of the current browser session
    Expected result: only the current logged in user record should be returned
    Should return only those fields the client/user needs/needs to see
        _id: "McusEJpMrCXbwBBpa"
        emails: Array[1]
        profile: Object
 */
Meteor.users.find({}).fetch();

// Update the name for the current user
// update failed: Access denied: (because a user is not allowed to update this field)
Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: {firstname: "Fred Nerk"}}});

// Append a new role for the current user
// Expected result: Update failed: Access denied
Meteor.users.update({_id: Meteor.userId()}, {$push: {roles: "superDuperUser"}});

// Completely replace the current profile for a user
// Expected result: 1 record updated (but possible issues if important profile info (such as name) is deleted

// Remove the current user record
// Expected result: remove failed: Access denied. No allow validators set on restricted collection for method 'remove'.
Meteor.users.remove(this._id);

// Add a new user
Meteor.users.insert({profile:{firstname:"Fred"}});
//Expected value: insert failed: Access denied. No allow validators set on restricted collection for method 'insert'.
