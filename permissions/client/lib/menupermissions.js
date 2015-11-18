/**
 *  menu permissions
 *
 *  Menu permissions are based on a user's account type (Foundation etc)
 *
 *  These permissions are simply to determine whether a menus are active or disabled
 *  Security is actually controlled by the server methods that a user action calls
 *
 */

clientSettings.enabledMenus = {
    // The keys are account type
    // A user will have only one set only

    // User not logged in or no account
    0: {
        home: true,
        about: true,
        login: true,
        account: false,
        projects: false,
        messages: false,
        settings: false
    },

    // Foundation (free) account
    100: {
        home: true,
        about: true,
        login: false,
        account: true,
        projects: true,
        messages: true,
        settings: false,

        projectView: true,
        projectAdd: true,
        projectClone: false,
        projectShare: false,
        projectDelete: true,

        modelView: true,
        modelAdd: true,
        modelClone: false,
        modelDelete: true,
        modelRun: true,

        StepView: true,
        stepAdd: true,
        stepClone: false,
        stepDelete: true

    },

    // No Limits account
    200:{},

    // The Lot account
    300: {},

    // General admin
    10001: {}
};
