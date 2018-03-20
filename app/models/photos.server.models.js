const db = require('../../config/db'),
    fs = require('fs');
const photoPath = 'app/models/photos/';

exports.select = function(res, auctionId, contentType, done) {
    let path = photoPath + auctionId + '.' + contentType;
    res.sendFile(path, {root: "./"});
    done(true);
    // fs.readFile(path, function(err, data) {
    //     if (err) {
    //         done(false);
    //     } else {
    //         done(data);
    //     }
    // });
};

exports.insert = function(req, auctionId, contentType, done) {
    let path = photoPath + auctionId + '.' + contentType;
    req.pipe(fs.createWriteStream(path));
    done(true);
};

exports.drop = function(auctionId, contentType, done) {
    let path = photoPath + auctionId + '.' + contentType;
    fs.unlink(path, function(err) {
        if (err) {
            done(false);
        } else {
            done(true);
        }
    });
};