
setDefaultRoles = function(user) {
    // Set default roles for role based permissions
    user.roles = settings.defaultRoles;

    userHistoryAdd(user, "Default roles set to: " + JSON.stringify(user.roles));

};
