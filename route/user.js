const { defineRoutes } = require('./../util/helper');
const { USER_TYPE } = require('./../util/constant');

// Define routes
const routes = [{
    controller: 'login',
    description: 'Login',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/login',
    authentication: false,
    type: 'post',
    versions: ['v1']
}, {
    controller: 'logout',
    description: 'Logout',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/logout',
    authentication: true,
    type: 'post',
    versions: ['v1']
}, {
    controller: 'register',
    description: 'Register a user',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/register',
    authentication: false,
    type: 'post',
    versions: ['v1']
}, {
    controller: 'patch',
    description: 'Patch himself/herself',
    fallbackVersion: 'v1',
    handlers: [],
    path: '/',
    authentication: true,
    type: 'patch',
    versions: ['v1']
}];


// Export route
module.exports = (version) => defineRoutes(routes, 'user', version);