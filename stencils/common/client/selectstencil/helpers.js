/**
 * Created by andrew on 27/11/2015.
 */

Template.selectStencil.helpers({

    stencilCategories: function() {
        var data = StencilsCollection.find().fetch();
        var distinctCategories = _.uniq(data, false, function(d) {
            return d.category;
        });
        return _.pluck(distinctCategories, "category");
    },

    stencilsList: function (category) {
        /**
         *  Return the step stencils for the current category
         *  Sort them by order and reverse created date if order is the same
         */

        return StencilsCollection.find({
            category: category
        }, {
            sort: {
                order: 1,
                createdAt: -1
            }
        });
    }
});