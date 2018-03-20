const auctions = require('../models/auctions.server.models'),
    auth = require('../models/authentication.server.models'),
    moment = require('moment');

exports.getAll = function(req, res) {
    let sql = "SELECT auction_id, auction_title, auction_categoryid, auction_reserveprice, auction_startingdate, auction_endingdate FROM auction LIMIT";

    // ---------- LIMIT ----------
    let isComma = false;
    let startIndex = parseInt(req.query.startIndex);
    if (startIndex != 'undefined') {
        sql += " " + startIndex;
        isComma = true;
    }
    let count = parseInt(req.query.count);
    if (count != 'undefined') {
        if (isComma) {
            sql += ",";
        } isComma = false;
        sql += " " + count;
    }

    if (parseInt(req.query.q) != 'undefined') {

    }
    if (parseInt(req.param('category-id') != 'undefined')) {

    }
    if (parseInt(req.query.seller) != 'undefined') {

    }
    if (parseInt(req.query.bidder) != 'undefined') {

    }
    if(parseInt(req.query.winner) != 'undefined') {

    }

    sql += ";";
    console.log(sql);

    auctions.getAll(sql, function(result) {
        res.send(result);
    });
};

exports.create = function(req, res) {
    let token = req.get('X-Authorization');
    auth.checkToken(token, function(userId) {
       if (userId) {
           let auction_data = [[
               req.body.title,
               req.body.categoryId,
               req.body.description,
               req.body.reservePrice,
               req.body.startingBid,
               (moment(req.body.startDateTime).format('YYYY-MM-DD HH:mm:ss')),
               (moment(req.body.endDateTime).format('YYYY-MM-DD HH:mm:ss'))
           ]];
           console.log(auction_data);
           auctions.create(token, auction_data, function(result) {
               if (result) {
                   res.status(201).send({"id": result});
               } else {
                   res.status(500).send();
               }
           });
       } else {
           res.status(401).send();
       }
    });
};

exports.getOne = function(req, res) {
    let auctionId = req.params.auctionId;
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
        "bids": []
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
            auctions.viewBids(auctionId, function(bids) {
                response["bids"] = bids;
                // after all info added to JSON response, send the response
                res.status(200).send(response);
            });
        });
    });
};

exports.alter = function(req, res) {
    let token = req.get('X-Authorization');
    let auctionId = req.params.auctionId;
    let auctionData = [
        req.body.catagoryId,
        req.body.title,
        req.body.description,
        (moment(req.body.startDateTime).format('YYYY-MM-DD HH:mm:ss')),
        (moment(req.body.endDateTime).format('YYYY-MM-DD HH:mm:ss')),
        req.body.reservePrice,
        req.body.startingBid,
        req.body.startingBid,
        auctionId
    ];
    let rowDataNames = ['auction_categoryid', 'auction_title', 'auction_description', 'auction_startingdate', 'auction_endingdate', 'auction_reserveprice', 'auction_startingprice', 'auction_id'];

    auth.checkToken(token, function(correctToken) {
        if (correctToken) {
            auctions.getOne(auctionId, function(result) {
                // fill undefined auction_data with previous value
                for (let i = 0; i < auctionData.length; i++){
                    if(auctionData[i] === undefined){
                        auctionData[i] = result[0][rowDataNames[i]];
                    }
                }
                console.log("controler auctionData" + auctionData);
                // update with newly compiled auctionData
                auctions.update(auctionData, function(result) {
                    if(result){
                        res.status(200).send();
                    } else {
                        res.status(500).send(result);
                    }
                });

            });
        } else {
            res.status(401).send();
        }
    });
};

exports.viewBids = function(req, res) {
    let auctionId = req.params.auctionId;
    auctions.viewBids(auctionId, function(result) {
        if (result) {
            res.status(200).send(result);
        } else {
            res.send(404).send();
        }
    });
};

exports.makeBid = function(req, res) {
    let token = req.get('X-Authorization');
    let auctionId = parseInt(req.params.auctionId);
    let amount = parseFloat(req.query.amount);

    auth.checkToken(token, function(userId) {
        if (userId) {
            auctions.makeBid([userId, auctionId, amount, 0], function(result) {
                res.status(201).send(result);
            });
        } else {
            res.status(401).send();
        }
    });
};