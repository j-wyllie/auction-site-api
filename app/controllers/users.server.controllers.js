const users = require('../models/users.server.models'),
    authentication = require('../models/authentication.server.models');

exports.create = function(req, res) {
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
    let username = req.query.username;
    let password = req.query.password;
    users.getUserId(username, password, function(userId) {
        if (userId) {
            authentication.generateToken(username, password, function(token) {
                authentication.insertToken(token, userId, function(result) {
                    let response = {};
                    response['id'] = userId;
                    response['token'] = token;
                    res.status(200).send(response);
                });
            });
        } else {
            res.status(400).send("Invalid username/email/password supplied");
        }
    });
};

exports.logout = function(req, res) {
    let token = req.get('X-Authorization');
    authentication.checkToken(token, function(userId) {
        if (userId) {
            authentication.ResetToken(userId, function(leavingUser) {
                res.status(200).send();
            });
        } else {
            res.status(401).send();
        }
    });

};

exports.get = function(req, res) {
    let userId = req.params.userId;
    let token = req.get('X-Authorization');
    let response = {
        "username": "string",
        "givenName": "string",
        "familyName": "string",
        "email": "string",
        "accountBalance": 0
    };
    authentication.checkToken(token, function(result) {
        if (result == userId) {
            users.getUserRows(userId, function(result) {
                response['username'] = result[0]['user_username'];
                response['givenName'] = result[0]['user_givenname'];
                response['familyName'] = result[0]['user_familyname'];
                response['email'] = result[0]['user_email'];
                response['accountBalance'] = result[0]['user_accountbalance'];
                console.log(response);
                res.status(200).send(response);
            });
        } else {
            res.status(404).send();
        }
    });

};

exports.alter = function (req, res) {
    users.alter(function(result) {
        res.send(result);
    });
};
