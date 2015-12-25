/**
 * Created by andrew on 27/11/2015.
 */




Template.header.helpers({

    isDisabled: function (type) {
        var projectId = Session.get('project');
        var modelId = Session.get('model');
        var stepId = Session.get('step');

        if (type == 'project' && !projectId) {
            // No current project so disable it
            return "disabled";
        } else if (type == 'model' && (!projectId || !modelId)) {
            // No current project or model so disable it
            return "disabled";

        } else if (type == 'step' && (!projectId || !modelId || !stepId)) {
            // No current project, model, or step so disable it
            return "disabled";

        } else {
            // valid project, model, or step so keep it enabled
            return null;
        }
    }

})
;


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
