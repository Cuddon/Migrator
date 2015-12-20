/**
 * Created by andrew on 27/11/2015.
 */


/*
Template.viewStep.onRendered( function() {


});
*/

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

