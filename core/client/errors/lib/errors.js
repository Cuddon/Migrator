/**
 * Created by Andrew on 31/05/2015.
 */

Session.setDefault('errorCount', 0);
Session.setDefault('errorMessages', []);

Template.errors.helpers({
  errorMessages: function(){
    return Session.get("errorMessages");
  }
});

// Define a global function this way
showError = function(error, reason) {
  // Add an error message to the display list
  // e.g.
  //    showError('database-error', 'There was a database error. Please contact your system administrator');

  // Increment the error count
  Session.set('errorCount', Session.get('errorCount') + 1);

  // Add the message to the list
  var errors = Session.get('errorMessages');
  errors.push({
    _id:    Session.get('errorCount'),
    error:  error,
    reason: reason
  });

  Session.set('errorMessages', errors);
};

deleteErrorMessage = function(id) {
  // Delete  error message from the display list

  var errors = Session.get('errorMessages');
  delete errors[id];
  Session.set('errorMessages', errors);
  alert(Session.get('errorMessages'));
};

