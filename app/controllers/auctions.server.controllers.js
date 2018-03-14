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
    // response skeleton
    let response = {
        "categoryId": 0,
        "categoryTitle": "string",
        "title": "string",
        "reservePrice": 0,
        "startDateTime": 0,
        "endDateTime": 0,
        "description": "string",
        "createtionDateTime": 0,
        "photoUris": [],
        "seller": {
            "id": 0,
            "username": "string",
        },
        "currentBid": 0,
        "bids": [
            {
                "amount": 0,
                "datetime": 0,
                "buyerId": 0,
                "buyerUsername": "string"
            }
        ]
    };
    auctions.getOne(auctionId, function(auctionRows) {
        if (auctionRows) {
            // adding auction data response JSON
            response["categoryId"] = auctionRows[0]["auction_categoryid"];
            response["categoryTitle"] = auctionRows[0]["auction_title"];
            response["reservePrice"] = auctionRows[0]["auction_reserveprice"];
            response["startDateTime"] = auctionRows[0]["auction_startingdate"];
            response["endDateTime"] = auctionRows[0]["auction_endingdate"];
            response["description"] = auctionRows[0]["auction_description"];
            response["creationDateTime"] = auctionRows[0]["auction_creationdate"];
        } else {
            res.send(404);
            return;
        }
        let userId = auctionRows[0]["auction_userid"];
        // adding seller data to response JSON
        auctions.getSeller(userId, function(sellerRows) {
            let userName = sellerRows[0]["user_username"]
            response["seller"] = {"id": userId, "username": userName};
            // adding bid data to response JSON
            auctions.viewBids(auctionId, function(bidRows) {
                response["bids"][0] = bidRows;

                res.send(response);
            });
        });
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