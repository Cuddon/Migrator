userHistoryAdd = function(user, text) {
    // Add an item to the account history
    user.history.push(new Date() + ":: " + text.trim());
};


userHistoryClear = function(user) {
    // Clear or initialise a user's history
    user.history = [];
};


