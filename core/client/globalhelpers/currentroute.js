
// isCurrentRoute helper

Template.registerHelper('isCurrentRoute', function (route) {
    // Compares the current route to the nominated route

    if (Router.current() && Router.current().route.getName()) {
        return (route.trim() === Router.current().route.getName().replace('.', '-'));
    } else {
        // No valid route
        return false;
    }
});

