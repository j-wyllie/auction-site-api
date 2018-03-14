const auctions = require('../models/auctions.server.models');

exports.getAll = function(req, res) {
    // partial implementation
    auctions.getAll(function(result) {
        res.send(result);
    });
};

exports.create = function(req, res) {
    let token = req.get('X-Authorization');
    let auction_data = [[
        req.body.title,
        req.body.categoryId,
        req.body.description,
        req.body.reservePrice,
        req.body.startingBid,
        req.body.startDateTime,
        req.body.endDateTime
    ]];
    auctions.create(token, auction_data, function(result) {
        if (result) {
            res.status(201).send({"id": result});
        } else {
            res.send("failed");
        }
    });
};

exports.getOne = function(req, res) {
    let auctionId = req.params.id;
    let response = {};
    auctions.getOne(auctionId, function(result) {
        if (result) {
            response["categoryId"] = result["auction_categoryid"];
            response["categoryTitle"] = result["auction_title"];
            response["reservePrice"] = 
            res.send(result);
        } else {
            res.send(404);
        }
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