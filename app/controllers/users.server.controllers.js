const users = require('../models/users.server.models');

exports.create = function (req, res) {
    let user_data = [[
        req.body.username,
        req.body.givenName,
        req.body.familyName,
        req.body.email,
        req.body.password
    ]];
   users.insert(user_data, function(result) {
       if (result === false) {
           res.status(400).send("malformed request");
       } else {
           res.status(200).send(result);
       }
   });
};

exports.login = function(req, res) {
    let user_data = [[
        req.params.username,
        req.params.email,
        req.params.password
    ]];
    users.login(function(user_data, result) {
        res.send(result);
    });
};

exports.logout = function (req, res) {
    users.logout(function(result) {
        res.send(result);
    });
};

exports.get = function (req, res) {
    users.get(function(result) {
        res.send(result);
    });
};

exports.alter = function (req, res) {
    users.alter(function(result) {
        res.send(result);
    });
};
