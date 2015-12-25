Template.fileSelectField.events({

    "click #select-file-button ": function (event) {

        // trigger the hidden 'file' input element
        $("#getFileDialog").click();

    },

    "change #getFileDialog": function (event, template) {
        // store the selected file name to the visible input field (which can be edited manually if desired
        //alert(event.target.value);
        $('#' + this.field.id).val(event.target.value);
    }


});

