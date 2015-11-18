/**
 *  Reactive sessions variable and helper to identity which menus should be enabled
 */

Session.setDefault('enabledMenus', {});

Template.registerHelper('isMenuEnabled', function(){
    return Session.get('enabledMenus');
});


Tracker.autorun(function() {
    /**
     *
     *  Update the session variable reactively whenever the account type changes
     *  todo: move menu permissions to database and read on startup rather than having a .js file containing all menu permissions
     */

    if (Meteor.user()){
        // A user is logged in
        var user = Meteor.users.findOne({_id: Meteor.userId()});
        if (user && user.account && user.account.type) {
            // Account type is set for this user
            // Look up the enabled menus using the account type
            // Account type e.g. = 100 (Foundation)
            accountType = user.account.type;
        } else {
            var accountType = 0;    // No account
        }
    } else {
        // User not logged in
        accountType = 0;    //No account if user is not logged in
    }

    // Menus enabled for the user's account type
    // enabledMenus e.g. = {home: true, projects: true}
    Session.set('enabledMenus', clientSettings.enabledMenus[accountType]);
});

