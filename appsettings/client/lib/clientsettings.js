/**
 * Declare settings global variable.
 * In 'lib' so it will load before other .js files.
 */


// Declare (client) settings on a global object (does not vary by session)
clientSettings = {};

// Expose clientSettings to all templates
Template.registerHelper('clientSettings', function(){
    return clientSettings;
});

