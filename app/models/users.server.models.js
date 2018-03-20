const db = require('../../config/db'),
    auth = require('./authentication.server.models'),
    fs = require('fs');

exports.insert = function(user_data, done) {
    let sql = "INSERT INTO auction_user (user_username, user_givenname, user_familyname, user_email, user_password) VALUES (?); SELECT LAST_INSERT_ID() AS user_id";
    db.get_pool().query(sql, user_data, function(err, rows) {
      if (err) {
          return done(false);
      } else {
          done({"id": rows[1][0]['user_id']});
      }
    });
};

exports.getUserId = function(username, password, done) {
    db.get_pool().query('SELECT user_id FROM auction_user WHERE (user_username = ? OR user_password = ?)', [username, password],
        function(err, rows) {
            try {
                done(rows[0]['user_id']);
            } catch (TypeError) {
               done(false);
            }
    });
};

exports.getUserRows = function(user_id, done){
    db.get_pool().query('SELECT * FROM auction_user WHERE user_id = ?', user_id,
        function(err, rows){
            if(err) {
                done(false);
            } else {
                done(rows);
            }
        });
};

exports.updateUserDetails = function(user_details, done) {
    let id = user_details['id'];
    let username = user_details['username'];
    let givenName = user_details['givenName'];
    let familyName = user_details['familyName'];
    let email = user_details['email'];
    let password = user_details['password'];
    let salt = user_details['salt'];
    let token = user_details['token'];
    let accountBalance = user_details['accountBalance'];
    let reputation = user_details['reputation'];

    let user_data = [id,username,givenName,familyName,email,password,salt,token,accountBalance,reputation,id];

    let sql = "UPDATE auction_user SET user_id = ?,user_username = ?, user_givenname = ?,user_familyname = ?,user_email = ?,user_password = ?,user_salt = ?, user_token = ?, user_accountbalance = ?,user_reputation = ? WHERE user_id = ?"
    db.get_pool().query(sql, user_data, function(err,result) {
        if (err){
            done(result);
        }
        done(result);
    });
};