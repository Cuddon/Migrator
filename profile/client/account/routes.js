
//AccountsTemplates.configureRoute('signIn');



// Authorisation page
Router.route('/profile', function () {
    // Render the about page into the content area
    this.render('profile', {to: 'content'});
    Session.set('activity', "Profile");
});
