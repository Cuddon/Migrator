/**
 * Created by Andrew on 30/05/2015.
 */



Template.registerHelper('showNotes', function () {
    return Session.get("showNotes");
});

