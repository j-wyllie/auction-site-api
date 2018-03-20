const photos = require('../controllers/photos.server.controllers');

module.exports = function(app) {
    app.route('/api/v1/auctions/:auctionId/photos')
        .get(photos.get)
        .post(photos.add)
        .delete(photos.delete);
};