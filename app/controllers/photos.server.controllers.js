const photos = require('../models/photos.server.models');

exports.getAuctionPhotos = function(req, res) {
    photos.getAuctionPhotos(function(result) {
        if (result === false) {
            res.status(400).send("malformed request");
        } else {
            res.status(200).send(result);
        }
    });
};

exports.addAuctionPhoto = function(req, res) {
    photos.addAuctionPhoto(function(result) {
        res.send(result);
    });
};

exports.getOneAuctionPhoto = function(req, res) {
    photos.getOneAuctionPhoto(function(result) {
        res.send(result);
    });
};

exports.updateAuctionPhoto = function(req, res) {
    photos.updateAuctionPhoto(function(result) {
        res.send(result);
    });
};

exports.deleteAuctionPhoto = function(req, res) {
    photos.deleteAuctionPhoto(function(result) {
        res.send(result);
    });
};