/*
 * List Projects template events
 * */

Template.listProjects.events({

    // Add a new Project
    "click .add-project-button": function () {
        Router.go("addproject");

        // Prevent default form action
        return false;
    },


    // A project card/list item is clicked
    "click .project-item": function () {
        var projectId = this._id;

        Session.set('activity', "Projects > " + this.name);

        //Open the selected project view/edit template
        Router.go('project', {_id: projectId});

        // Prevent default form submit
        return false;
    }


});

