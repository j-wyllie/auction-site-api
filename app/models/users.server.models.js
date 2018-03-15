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
    db.get_pool().query('SELECT user_id FROM auction_user WHERE user_username = ? AND user_password = ?', [username, password],
        function(err, rows) {
            try {
                done(rows[0]['user_id']);
            } catch (TypeError) {
               done(false);
            }
    });
};

exports.getUserJson = function(user_id, done){
    db.get_pool().query('SELECT * FROM auction_user WHERE user_id = ?', user_id,
        function(err, result){
            if(err) {
                done(false);
            } else {
                done(result);
            }
        });
};

exports.alter = function(done) {

};