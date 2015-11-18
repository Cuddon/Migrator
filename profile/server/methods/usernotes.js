userNotesAdd = function(user, text) {
    // Add an item to the notes history
    user.notes.push(new Date() + ":: " + text.trim());
};


userNotesClear = function(user) {
    // Clear or initialise a user's notes
    user.notes = [];
};


