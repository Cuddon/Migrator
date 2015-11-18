// Core module routes

/*
    Default layout for all routes
    Cane be overridden in a single route by:
    this.layout('ApplicationLayout');
*/

Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});




