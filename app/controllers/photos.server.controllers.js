const photos = require('../models/photos.server.models');

exports.get = function(req, res) {
    photos.select(function(result) {
        if (result === false) {
            res.status(400).send("malformed request");
        } else {
            res.status(200).send(result);
        }
    });
};

exports.add = function(req, res) {
    photos.insert(function(result) {
        res.send(result);
    });
};

exports.delete = function(req, res) {
    photos.drop(function(result) {
        res.send(result);
    });
};