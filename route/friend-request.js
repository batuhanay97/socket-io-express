const { defineRoutes } = require('./../util/helper');
const { USER_TYPE } = require('./../util/constant');

// Define routes
const routes = [{
    controller: 'getFriendRequests',
    description: 'get friend request user',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/all',
    authentication: true,
    type: 'post',
    versions: ['v1']
}, {
    controller: 'patch',
    description: 'Patch request',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/:requestId',
    authentication: true,
    type: 'patch',
    versions: ['v1']
}, {
    controller: 'sendFriendRequest',
    description: 'send firned request',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/',
    authentication: true,
    type: 'post',
    versions: ['v1']
}];


// Export route
module.exports = (version) => defineRoutes(routes, 'friend-request', version);