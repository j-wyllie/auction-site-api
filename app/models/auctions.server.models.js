const db = require('../../config/db'),
    fs = require('fs');

exports.getAll = function(done) {

};

exports.create = function(auction_data, done) {
    let sql = "SELECT user_id FROM aution_user WHERE user_token=?; INSERT INTO auction (auction_title, auction_categoryid, auction_description, auction_reserveprice, auction_startingprice, auction_startingdate, auction_endingdate, auction_userid) VALUES (?)";
    db.get_pool().query(sql, auction_data, function(err, rows) {
        if (err) {
            return done(err);
        } else {
            done(rows);
        }
    });
};

exports.getOne = function(done) {

};

exports.alter = function(done) {

};

exports.viewBids = function(done) {

};

exports.makeBid = function(done) {

};

