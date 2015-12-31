/**
 * Created by andrew on 9/09/2015.
 */

Template.registerHelper('isEmpty', function(context) {
    /*
     Example usage: {{#unless isEmpty recordset}} Do something {{/unless}}
     */

    return _.isEmpty(context);
});


Template.registerHelper('isCurrentRoute', function (compareToRoute) {
    // Compares the current route to the nominated route

    var currentRoute = Router.current().route.getName();

    if (currentRoute) {
        // Retuun true if current route equals the comparison route
        return (compareToRoute.replace('.', '-') === currentRoute.replace('.', '-'));
    } else {
        // No valid route
        return false;
    }
});