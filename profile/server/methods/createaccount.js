
createAccount = function(user) {
    // Create a new account and defaults

    user.account = {
        type:           settings.defaultAccount.type,
        description:    settings.defaultAccount.description,
        active:         true,
        startDate:      new Date(),
        createdBy:      user._id,
        createdAt:      new Date(),
        updatedBy:      user._id,
        updatedAt:      new Date(),
        notes:          ""
    };

    userHistoryAdd(user, "Account created: " + JSON.stringify(user.account));
};


