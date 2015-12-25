/**
 * Created by andrew on 27/11/2015.
 */




Template.stepDetails.helpers({

    tabsList: function () {
        //return fields[Template.instance().data.step.stencilId];
        // Since Spacebars cannot iterate objects we need to convert this to a paird list
        return _.pairs(fields[Template.instance().data.step.stencilId]);
    },

    fieldsList: function (tab) {
        // Returns a list of objects
        return fields[Template.instance().data.step.stencilId][tab];
    },

    isActive: function(index) {
        if (index == 0) {
            // Make the first tab active
            return "is-active";
        } else {
            return null;
        }
    }

});


Template.registerHelper('getFieldValue', function (prop) {
    // Template helper to return a property details

    if (prop) {
        // Valid property

        // Check if there is a value stored in the database
        if (this.step.details.hasOwnProperty(prop)) {
            // Property exists in the saved step so use it
            return this.step.details[prop];
        } else {
            // Property does not exist in the saved step so use the default value
            return this.field.default;
        }

    } else {
        // Invalid property so return nothing
        return null;
    }

});


Template.registerHelper('isMandatory', function () {
    // Sets "required" if the field is mandatory
    if (this.field.validation.mandatory) {
        return "required";
    } else {
        return null;
    }
});

Template.registerHelper('isFullWidth', function () {
    // Sets class to make a text field full width
    if (this.field.fullWidth) {
        return "mdl-textfield--full-width";
    } else {
        return null;
    }
});

Template.registerHelper('isChecked', function () {
    // Checked field

    if (this.step.details.hasOwnProperty('checked')) {
        // 'Checked' property exists in the saved step so use it
        if (this.step.details['checked']) {
            // Checked is true so set the 'checked' HTML attribute
            return "checked";
        }
    } else {
        // 'Checked' property does not exist in the saved step so use the default value
        if (this.field.default) {
            // Checked is true so set the 'checked' HTML attribute
            return "checked";
        }
    }

    // Not checked
    return null;

});


Template.registerHelper('capitaliseFirstChar', function (str) {

    if (str) {
        return capitaliseFirstChar(str);

    } else {
        return null;
    }


});
