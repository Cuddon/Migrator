/**
 * Created by andrew on 9/09/2015.
 */

Template.registerHelper('isEmpty', function(context) {
    /*
     Example usage: {{#unless isEmpty recordset}} Do something {{/unless}}
     */

    var result = _.isEmpty(context)
    return result;
});
