/**
 * Created by andrew on 27/11/2015.
 */

Template.addStep.helpers({

    selectedStencil: function () {

        return StencilsCollection.findOne({_id: Session.get("selectedStencil")})
    }
});

