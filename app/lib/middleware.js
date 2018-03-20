const db = require('../../config/db'),
    auth = require('../models/authentication.server.models');

exports.isAuthorised = function(req, res, next) {
    let token = req.get('X-Authorization');
    auth.checkToken(token, function(userId) {
        if (userId) {
            next();
        } else {
            res.status(401).send();
        }
    });
};