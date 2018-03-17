const photos = require('../controllers/photos.server.controllers'),
    authentication = require('../controllers/authentication.server.controller');

module.exports = function(app) {
    app.route('/api/v1/auctions/:auctionId/photos')
        .get(photos.get)
        .post(photos.add)
        .delete(photos.delete);
};