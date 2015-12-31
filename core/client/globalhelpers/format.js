/**
 * Created by andrew on 5/09/2015.
 */

Template.registerHelper('formatTime', function(context) {
    /*
        Example usage: {{formatTime createdAt}}
     */

    //TODO: Need to internationalise the data format

    if(context)
        return moment(context).format('DD/MM/YYYY, hh:mm');
});


Template.registerHelper('capitaliseFirstChar', function (str) {

    if (str) {
        return capitaliseFirstChar(str);

    } else {
        return null;
    }

});
