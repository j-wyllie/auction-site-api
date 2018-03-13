const db = require('../../config/db'),
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

exports.login = function(done) {

};

exports.logout = function(done) {

};

exports.get = function(done) {

};

exports.alter = function(done) {

};