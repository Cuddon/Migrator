
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
