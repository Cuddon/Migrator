/**
 * Created by andrew on 27/11/2015.
 */

Template.addStep.onCreated( function() {

    // ReactiveVar: Id of the selected stencil (if any)
    Template.instance().selectedStencilId = new ReactiveVar(null);    // Empty initially
});


Template.addStep.helpers({

    stencil: function () {
        // Return the stencil details for the current stencil (ReactiveVar contains the ID of the current stencil)
        return StencilsCollection.findOne({_id: Template.instance().selectedStencilId.get()})
    }

});

