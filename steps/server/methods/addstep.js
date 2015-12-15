/**
 * Created by andrew on 14/11/2015.
 */
/**
 * Add a new step to a model
 */

Meteor.methods({

    addStep: function (step) {

        // Check if user is logged in
        if (!Meteor.userId()) {
            // Raise an error and send it to the client
            throw new Meteor.Error("logged-out", "You must be logged in to add a new step.");
        }

        // Check if the user has permission to add models
        if (!Meteor.call('checkForPermission', 'step-add')) {
            // Raise an error and send it to the client
            throw new Meteor.Error('not-authorised', "You do not have permission to add steps.");
        }

        // Check that all attributes are of the correct type
        check(step, {
            projectId: String,
            modelId: String,
            name: String,
            description: String,
            stencilId: String,
            stepGroup: Number,
            order: Number,
            image: String
        });

        // Ensure mandatory fields have been completed
        if (!step.projectId) {
            throw new Meteor.Error('Error', "Missing project ID for new step.");
        }
        if (!step.modelId) {
            throw new Meteor.Error('Error', "Missing model ID for new step.");
        }
        if (!step.name) {
            throw new Meteor.Error('mandatory fields', "A model name is mandatory.");
        }

        if (!step.stencilId) {
            throw new Meteor.Error('mandatory fields', "You must select a step stencil!");
        }

        // Add additional info
        //step.order = 0;    // User editable field for sort order
        step.notes = "";
        if (step.image.trim() === "") {
            step.image = settings.defaultStepImage;
        }
        step.ownerId = this.userId;  // Logged in user is the initial owner
        step.sharedToId = null;          // The step is not shared to anyone yet
        step.createdAt = new Date();     // current time
        step.createdBy = this.userId; // Always the user who initially created the step
        // _id is automatically created by MongoDB

        StepsCollection.insert(step, function (error, _id) {
            if (error) {
                // Raise an error and send it to the client
                throw new Meteor.Error('database-error', "Unable to add a new step. Please contact your administrator.");
            } else {
                console.log('step ' + _id + ' created by user ' + Meteor.userId() + ' at ' + new Date());
                // return the _id of the newly created document
                return _id;
            }
        });
    }
});

