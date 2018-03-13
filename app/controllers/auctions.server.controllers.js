const auctions = require('../models/auctions.server.models');

exports.getAll = function(req, res) {
    auctions.getAll(function(result) {
        if (result === false) {
            res.status(400).send("malformed request");
        } else {
            res.status(200).send(result);
        }
    });
};

exports.create = function(req, res) {
    let auction_data = [[
        req.get('X-Authorization'),
        req.body.title,
        req.body.categoryId,
        req.body.description,
        req.body.reservePrice,
        req.body.startingBid,
        req.body.startDateTime,
        req.body.endDateTime
    ]];
    auctions.create(auction_data, function(result) {
        res.send(result);
    });
};

exports.getOne = function(req, res) {
    auctions.getOne(function(result) {
        res.send(result);
    });
};

exports.alter = function(req, res) {
    auctions.alter(function(result) {
        res.send(result);
    });
};

exports.viewBids = function(req, res) {
    auctions.viewBids(function(result) {
        res.send(result);
    });
};

exports.makeBid = function(req, res) {
    auctions.makeBid(function(result) {
        res.send(result);
    });
};