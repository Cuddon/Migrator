/**
 * Created by andrew on 14/11/2015.
 */

Meteor.methods({

    // Delete a single step
    deleteStep: function (stepId) {
        /*
         Delete a step
         Returns True on success, raises an error otherwise
         */

        var result = false;

        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to delete a step.");
        }

        // Check if the user has permission to delete models
        if (!Meteor.call('checkForPermission', 'model-step')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to delete steps.");
        }

        // Check that all attributes are of the correct type
        check(stepId, String);

        // Ensure mandatory fields have been completed
        if (!stepId) {
            throw new Meteor.Error('Error', "Missing step ID.");
        }

        // Delete the model itself only if its steps have been successfully deleted

        StepsCollection.remove(stepId, function (error, docsRemoved) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to delete step: " + stepId);
            } else {
                // Success
                if (docsRemoved == 1) {
                    console.log('Step ' + stepId + ' deleted by user ' + Meteor.userId() + ' at ' + new Date());
                    result = true;
                } else {
                    // step _Id not found or multiple steps with the same id deleted (there should not be any)
                    throw new Meteor.Error('database-error', "Unable to delete step: " + stepId);
                }
            }
            return result;  // Result show always be true since an error is raise if an error occurred
        });
    }
});
