
// Subscribe to the userProfile record set
// based on the built in Meteor.users collection so no need to declare that collection
// Additional user data from the user's record, profile field

Tracker.autorun(function () {
    Meteor.subscribe("userProfile");
});
