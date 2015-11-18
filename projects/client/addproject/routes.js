
/* Add a new project*/

Router.route('/addproject', function () {
  if ( Meteor.userId() ) {
    // Render the template into the content area
    this.render('addProject', {to: 'content'});
    Session.set('activity', "Add a new project");
  } else {
    alert ("You must be logged in to add a new project");
    this.render('Home', {to: 'content'});
    Session.set('activity', "Home");
  }
});

