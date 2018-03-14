const db = require('../../config/db'),
    fs = require('fs');

exports.getAll = function(done) {
    let sql = "SELECT * FROM auction";
    db.get_pool().query(sql, function(err, rows) {
        if (err) {
            done(err);
        } else {
            done(rows);
        }
    });
};

exports.create = function(token, auction_data, done) {
    let userId = null;
    let sql_1 = "SELECT user_id FROM auction_user WHERE user_token = ?"
    let sql_2 = "INSERT INTO auction (auction_title, auction_categoryid, auction_description, auction_reserveprice, auction_startingprice, auction_startingdate, auction_endingdate, auction_userid) VALUES (?);";
    sql_2 += "SELECT LAST_INSERT_ID() AS auction_id;";
    db.get_pool().query(sql_1, token, function(err, rows) {
        if (err) {
            done(false);
        } else {
            userId = rows[0]['user_id'];
            auction_data[0].push(userId);
        }
        db.get_pool().query(sql_2, auction_data, function(err, rows) {
            if (err) {
                done(false);
            } else {
                done(rows[1][0]['auction_id']);
            }
        });
    });
};

exports.getOne = function(auctionId, done) {
    let sql = "SELECT * FROM auction WHERE auction_id = ?";
    db.get_pool().query(sql, auctionId, function(err, rows){
        if (err) {
            done(false);
        } else {
            done(rows);
        }
    });
};

exports.getSeller = function(userId, done) {
    let sql = "SELECT user_username FROM auction_user WHERE user_id = ?";
    db.get_pool().query(sql, userId, function(err, rows) {
      if (err) {
          done(false);
      } else {
          done(rows);
      }
    });
};

exports.alter = function(done) {

};

exports.viewBids = function(auctionId, done) {
    let sql = "";
    done();
};

exports.makeBid = function(done) {

};

