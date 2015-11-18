
// About page
Router.route('/about', function () {
    // Render the about page into the content area
    this.render('about', {to: 'content'});
    Session.set('activity', "About");
});

