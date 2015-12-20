/**
 * Created by Andrew on 7/06/2015.
 */


Template.viewStep.events({

    // Close button is clicked, go back to the project with it's models list
    'click .back-button': function () {
        var projectId = this.project._id;
        var modelId = this.model._id;

        // Return to the model
        Router.go('model', {projectId: projectId, _id: modelId});

        // Prevent default form action
        return false;
    },

    // Show note button clicked
    "click .toggle-notes-button": function () {
        // Toggle show/hide notes
        Session.set("showNotes", !Session.get("showNotes"));

        // Prevent default form action
        return false;
    },


    // Notes are edited
    "change #notes": function () {
        var step = {
            _id: this.step._id,
            notes: $('#notes').val()
        };

        // Update the notes using a server method
        Meteor.call('updateStepNotes', step, function (error) {
            if (error) {
                // Display the error to the client
                showError(error.error, error.reason);
            }
        });

        // Prevent default form action
        return false;
    },


    // Edit button is clicked
    "click .edit-button": function () {
        // Edit the step
        Router.go('editStep', {projectId: this.step.projectId, modelId: this.step.modelId, _id: this.step._id});

        // Prevent default form action
        return false;
    },


    // Clone button is clicked
    "click .clone-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },

    // Share button is clicked
    "click .share-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },

    // Share button is clicked
    "click .info-button": function () {
        alert("Not implemented");

        // Prevent default form action
        //return false;
    },


    // Delete button is clicked
    "click .delete-button": function () {

        var conf = confirm("Please confirm.\nDo you want to delete step: " + this.step.name + ". \n\n***This cannot be undone.***");
        if (conf === true) {
            // Double confirmation so delete the step
            var self = this;
            Meteor.call('deleteStep', this.step._id, function (error) {
                if (error) {
                    // Display the error to the client
                    showError(error.error, error.reason);
                }
                // Return to the parent model
                Router.go('model', {projectId: self.step.projectId, _id: self.step.modelId});
            });

        }

        // Prevent default form action
        return false;
    },

    // Save (update) the step details
    "submit": function (event, template) {

        var projectId = this.project._id;
        var modelId = this.model._id;

        // Grab the step details from the template data scope
        var step = this.step;

        // Check for empty mandatory input fields
        var mandatoryFieldIssues = checkMandatoryFields("#step-details .tab-content input");

        // Get the Step details from the form and merge them with teh step object
        var stepDetails = getStepDetails();
        _.extend(step, stepDetails);


        // Update the step in the database using a server method
        Meteor.call('updateStep', step, function (error) {
            if (error) {
                // Display the error to the client, and stay on the same page
                showError(error.error, error.reason)
            } else {
                // Success, go back to displaying the parent model and it's list of steps
                Router.go("model", {projectId: projectId, _id: modelId});
            }
        });

        // Prevent default form submit
        return false;
    }


});


function getStepDetails() {
    /*
     Get the entered details for the step
     */

    var stepDetails = {};

    // Iterate over the tabs
    var tabs = $("#step-details .mdl-tabs__panel");
    tabs.each(function (index, tab) {

        // Iterate over all the input fields in the tab
        var inputFields = $(tab).find($("input"));
        inputFields.each(function (i, elem) {
            // Extract and store the value of each field
            if (elem.dataset.field && elem.dataset.field != "none") {
                // Store the field and its value
                var key = elem.dataset.field;
                var val = $(elem).val();
                if (elem.type == 'checkbox') {
                    val = elem.checked;
                }

                stepDetails[key] = val;

                // Check if the field is mandatory
                // TODO: do this before saving
                if (elem.dataset.mandatory && !val) {
                    // field is mandatory and it is empty so raise an error
                    //$('label[for="foo"]');
                    showError("Mandatory Fields", "Missing mandatory fields")
                }

            }
        });


    });

    console.log(stepDetails);

    return stepDetails;
}

function checkMandatoryFields(selector) {
    /*
        Checks for mandatory fields that are empty or null

        selector:   jquery selector to identify the input field elements to check
                    e.g. "#step-details .tab-content input"
     */

    var errors = 0;

    // Iterate over the input fields
    $(selector).each(function (i, elem) {

        if (elem.dataset.field && elem.dataset.mandatory) {
            // Mandatory field
            var key = elem.dataset.field;
            var val = $(elem).val();

            if (!val) {
                // field is mandatory and it is empty so raise an error
                errors += 1;
                showError("Mandatory Fields", "Missing mandatory fields");
                // highlight the field in error
                var currentClasses = elem.className;
                $(elem).removeClass(currentClasses);
                $(elem).addClass("mandatory-missing " + currentClasses);
            } else {
                $(elem).removeClass("mandatory-missing");
            }
        }
    });

    return errors;
}