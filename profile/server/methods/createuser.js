/**
 * Created by andrew on 24/08/2015.
 */

/*
 Meteor.methods({
 createNewUser: function (options) {

 //TODO: Check if this is secure sending the password to a method or should we call Accounts.createUser from the client
 // Check that all attributes are of the correct type
 check(options, {
 username: undefined,
 email: String,
 password: String,       // bcrypt password
 profile: {
 name: String
 }
 });
 Accounts.createUser(options);
 }
 });
 */

// Called automatically by the Accounts package
Accounts.onCreateUser(function (options, user) {
    // Add additional fields (server use only, never transmitted to a client)
    // 'options' comes from Accounts.createUser
    // 'user' is the new user object that is about to be saved

    if (options.profile) {
        // Profile information has been provided by the user

        // It should contain only a user's name and Community alias
        check(options.profile, {
            name: String,
            alias: String
        });

        // Copy across that profile to the user record
        user.profile = options.profile;

        // Ensure no dodgy whitespace
        user.profile.name = options.profile.name.trim();
        user.profile.name = options.profile.name.trim();

    } else {
        // No profile information from the user so create it
        user.profile = {
            name: "",
            alias: ""
        };
    }

    userHistoryClear(user);
    userNotesClear(user);

    createAccount(user);
    setDefaultRoles(user);

    //TODO: copy in the example project to get the user started

    // return the updated user record
    return user;
});



// Called automatically by the accounts package
Accounts.validateNewUser(function (user) {
    // Check that all attributes are of the correct type
    check(user, {
        createdAt: Date,
        emails: [Object],
        profile: {
            name: String,
            alias:  String,
        },
        account: Object,
        roles:  [String],
        history:    [String],
        notes:  [String],
        services: Object,
        _id:    String
    });

    if (!user.profile.name) {
        // Name is mandatory so if it is blank here set it to unknown
        user.profile.name = "Unknown"
    }


    // New user details validated
    //addToAccountHistory(user, "New user details validated.");
    userHistoryAdd(user, "New user details validated.");

    return true;
});


