const db = require('../../config/db'),
    fs = require('fs');

exports.getAll = function(done) {

};

exports.create = function(token, auction_data, done) {
    let userId = null;
    let sql_1 = "SELECT user_id FROM auction_user WHERE user_token = ?"
    let sql_2 = "INSERT INTO auction (auction_title, auction_categoryid, auction_description, auction_reserveprice, auction_startingprice, auction_startingdate, auction_endingdate, auction_userid) VALUES (?)";

    db.get_pool().query(sql_1, token, function(err, rows) {
        if (err) {
            done(err);
        } else {
            userId = rows[0]['user_id'];
            auction_data[0].push(userId);
        }
        db.get_pool().query(sql_2, auction_data, function(err, result) {
            if (err) {
                done(err);
            } else {
                done(result);
            }
        });
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

