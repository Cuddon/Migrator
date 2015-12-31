/**
 * Created by andrew on 27/11/2015.
 */

Template.listSteps.helpers({

    stepsList: function (group) {
        /**
         *  Return the steps for the current stepGroup only
         *  Sort them by order and creation date if order is the same (last added step goes at the bottom)
         */

        return StepsCollection.find({
            modelId: this.model._id,
            stepGroup: group
        }, {
            sort: {
                order: 1,
                createdAt: 1
            }
        });
    }
});