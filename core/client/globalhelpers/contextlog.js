Template.registerHelper('console', function () {
    /*
     {{console}}
     */
    console.log("*********");
    console.log("Console output from template: "+ Template.instance().view.name + ": ");
    console.log(this);
    console.log("*********");
    return null;
});
