/**
 * Created by andrew on 27/11/2015.
 */


Template.viewStep.onRendered( function() {

    // Initialise Materialize Tabs widget
    //$('ul.tabs').tabs();

    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        }
    );

});


Template.viewStep.helpers({

    stencilprop: function (stencilId, property) {
        /*
            Returns the value of the nominated property/field for the selected template
         */
        var stencil = StencilsCollection.findOne({_id: stencilId});
        if (stencil) {
            return stencil[property];
        } else {
            return null;
        }
    }

});

