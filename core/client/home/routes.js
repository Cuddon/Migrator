// Home page
Router.route('/', function () {
    // Render the about page into the content area
    this.render('Home', {to: 'content'});
    Session.set('activity', "Home");
}, {
    name: 'home'
});

