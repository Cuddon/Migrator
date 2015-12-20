/**
 * Created by andrew on 27/11/2015.
 */




Template.stepDetails.helpers({

    tabsList: function () {
        //return fields[Template.instance().data.step.stencilId];
        // Since Spacebars cannot iterate objects we need to convert this to a paird list
        return _.pairs(fields[Template.instance().data.step.stencilId]);
    },

    fieldsList: function(tab) {
        // Returns a list of objects
        return fields[Template.instance().data.step.stencilId][tab];
    }

});


Template.registerHelper('getValue', function (obj, prop) {
    // Template helper to return a property details
    if (obj && prop && obj.hasOwnProperty(prop)) {
        return obj[prop];
    } else {
        return null;
    }
});


Template.registerHelper('mandatory', function () {
    // Sets "required" if the field is mandatory
    if (field.validation.mandatory) {
        return "required";
    } else {
        return null;
    }
});

Template.registerHelper('checked', function () {
    // Checked field
    if (field.checked) {
        return "checked";
    } else {
        return null;
    }
});
