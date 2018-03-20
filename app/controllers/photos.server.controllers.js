const photos = require('../models/photos.server.models');

exports.get = function(req, res) {
    let auctionId = parseInt(req.params.auctionId);
    let contentType = req.get('Content-Type');
    let extension = undefined;
    if (contentType == 'image/png') {
        extension = 'png';
    } else if (contentType == 'image/jpeg') {
        extension = 'jpg';
    }
    photos.select(res, auctionId, extension, function(result) {
        if (result) {
            //res.status(200).sendFile(result);
        } else {
            res.status(400).send();
        }
    });
};

exports.add = function(req, res) {
    let auctionId = parseInt(req.params.auctionId);
    let contentType = req.get('Content-Type');
    let extension = undefined;
    let token = req.get('X-Authorization');
    auth.checkToken(token, function(userId) {
        if (userId) {
            if (contentType == 'image/png') {
                extension = 'png';
            } else if (contentType == 'image/jpeg') {
                extension = 'jpg';
            }
            if (extension != undefined) {
                photos.insert(req, auctionId, extension, function (result) {
                    res.status(201).send(result);
                });
            } else {
                res.status(400).send();
            }
        } else {
            res.status(401).send();
        }
    });
};

exports.delete = function(req, res) {
    let auctionId = parseInt(req.params.auctionId);
    let contentType = req.get('Content-Type');
    let extension = undefined;
    if (contentType == 'image/png') {
        extension = 'png';
    } else if (contentType == 'image/jpeg') {
        extension = 'jpg';
    }
    let token = req.get('X-Authorization');
    auth.checkToken(token, function(userId) {
        if (userId) {
            photos.drop(auctionId, extension, function (result) {
                if (result) {
                    res.status(201).send();
                } else {
                    res.status(404).send();
                }
            });
        } else {
            res.status(401).send();
        }
    });
};