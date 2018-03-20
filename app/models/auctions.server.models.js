const db = require('../../config/db'),
    fs = require('fs');

exports.getAll = function(sql, done) {
    //let sql = "SELECT auction_id, auction_title, auction_categoryid, auction_reserveprice, auction_startingdate, auction_endingdate FROM auction WHERE LIKE LIMIT startIndex, count";
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
    let sql_2 = "INSERT INTO auction (auction_title, auction_categoryid, auction_description, auction_reserveprice, auction_startingprice, auction_creationdate, auction_startingdate, auction_endingdate, auction_userid) VALUES (?);";
    sql_2 += "SELECT LAST_INSERT_ID() AS auction_id;";
    db.get_pool().query(sql_1, token, function(err, rows) {
        if (err) {
            console.log("q1: " + err);
            done(false);
        } else {
            userId = rows[0]['user_id'];
            auction_data[0].push(userId);
        }
        db.get_pool().query(sql_2, auction_data, function(err, rows) {
            if (err) {
                console.log("q2: " + err);
                done(false);
            } else {
                done(rows[1][0]['auction_id']);
            }
        });
    });
};

exports.getOne = function(auctionId, done) {
    let sql = "SELECT * FROM auction WHERE auction_id = ?";
    db.get_pool().query(sql, auctionId, function(err, rows) {
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

exports.update = function(auctionData, done) {
    let sql = "UPDATE auction SET auction_categoryid = ?, auction_title = ?, auction_description = ?, auction_startingdate = ?, auction_endingdate = ?, auction_reserveprice = ?,  auction_startingprice = ?  WHERE auction_id = ?";
    db.get_pool().query(sql, auctionData, function(err, result) {
        if (err){
            console.log(err);
            done(false);
        } else {
            done(result);
        }
    });
};

exports.viewBids = function(auctionId, done) {
    let sql = "SELECT bid.bid_amount AS amount, bid.bid_datetime AS datetime, bid.bid_userid AS buyerId, auction_user.user_username AS buyerUsername FROM bid INNER JOIN " +
        "auction_user ON auction_user.user_id=bid.bid_userid WHERE bid.bid_auctionid = ?";
    db.get_pool().query(sql, [auctionId], function(err, rows) {
        if (err) {
            done(false);
        } else {
            done(rows);
        }
    });
};

exports.makeBid = function(bidData, done) {
    console.log(bidData);
    let sql = "INSERT INTO bid (bid_userid, bid_auctionid, bid_amount, bid_datetime) VALUES (?);";
    db.get_pool().query(sql, bidData, function(err, rows) {
        if (err) {
            done(err);
        } else {
            done(rows);
        }
    });
};

