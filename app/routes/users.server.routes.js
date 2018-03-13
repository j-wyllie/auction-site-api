const users = require('../controllers/users.server.controllers'),
    authentication = require('../../config/authentication');

module.exports = function(app) {
    app.route('/api/v1/users')
        .post(users.create);

    app.route('/api/v1/users/login')
        .post(users.login);

    app.route('/api/vi/users/logout')
        .post(authentication.isAuthorised, users.logout);

    app.route('/api/vi/users/:userId')
        .get(authentication.isAuthorised, users.get)
        .patch(authentication.isAuthorised, users.alter);
};