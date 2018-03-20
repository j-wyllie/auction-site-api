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
        //console.log(userId);
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
                res.status(200).send(response);
            });
        } else {
            res.status(404).send();
        }
    });

};

exports.alter = function (req, res) {
    let token = req.get('X-Authorization');
    let user_data =  {
        "id": req.body.id,
        "username": req.body.username,
        "givenName": req.body.givenName,
        "familyName": req.body.familyName,
        "email": req.body.email,
        "password": req.body.password,
        "salt":req.body.salt,
        "token":req.body.token,
        "accountBalance":req.body.accountBalance,
        "reputation":req.body.reputation

    };
    let jsonDataNames = ['id','username','givenName','familyName','email','password','salt','token','accountBalance','reputation'];
    let packetDataNames = ['user_id','user_username','user_givenname','user_familyname','user_email','user_password','user_salt','user_token','user_accountbalance','user_reputation'];

    authentication.checkToken(token, function(correctToken) {
        if (correctToken) {
            users.getUserRows(correctToken, function(result) {
                // fill undefined user_data with previous value
                for (let i = 0; i < 9; i++){
                    if(user_data[jsonDataNames[i]] === undefined){
                        user_data[jsonDataNames[i]] = result[0][packetDataNames[i]];
                    }
                }
                console.log("controler user_data" + user_data);
                // update with newly compiled user_data
                users.updateUserDetails(user_data, function(result) {
                    if(result){
                        res.status(200).send();
                    } else {
                        res.status(500).send();
                    }
                });

            });
        } else {
            res.status(401).send();
        }
    });
};
