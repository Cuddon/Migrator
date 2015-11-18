/**
 *  Role based permissions
 *
 *  Role are assigned to users
 *      user.roles = ['allUsers', 'projectOwner']
 *
 *  Permissions from multiple roles are aggregated to check a user action is permitted
 *  For security purposes, all permissions checks are performed server side
 *  Roles and permissions are not published to the client
 *
 */

settings.roleBasedPermissions = {
    // All users
    allUsers        : ['project-add'],

    // Project Owner (the creator unless ownership reassigned by an admin)
    projectOwner    : [
        'projectsList-view', 'project-update', 'project-delete', 'project-share',
        'modelsList-view', 'model-add', 'model-update', 'model-delete', 'model-run',
        'stepsList-view', 'step-add', 'step-update', 'step-delete'
    ],

    // User who has been shared a project by an owner
    sharedFullAccess: [
        'projectsList-view', 'project-update',
        'modelsList-view', 'model-add', 'model-update', 'model-delete', 'model-run',
        'stepsList-view', 'step-add', 'step-update', 'step-delete'
    ],

    sharedRunModel: [
        'projectsList-view-shared',
        'modelsList-view-shared', 'model-run-shared',
        'stepsList-view-shared'
    ],

    sharedViewOnly: [
        'projectsList-view-shared',
        'modelsList-view-shared',
        'stepsList-view-shared'
    ],

    // Observer of a shared project - view access only
    sharedObserver : [

    ],

    // Administrators
    admin : [
        'user-view', 'user-edit',
        'project-reassign-owner'
    ]
};
