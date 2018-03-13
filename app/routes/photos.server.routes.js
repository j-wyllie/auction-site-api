const photos = require('../controllers/photos.server.controllers'),
    authentication = require('../../config/authentication');

module.exports = function(app) {
    app.route('/api/v1/auctions/:id/photos')
        .get(photos.getAuctionPhotos)
        .post(photos.addAuctionPhoto);

    app.route('/api/v1/auctions/:auctionId/photos/:photoId')
        .get(photos.getOneAuctionPhoto)
        .put(photos.updateAuctionPhoto)
        .delete(photos.deleteAuctionPhoto);
};