const auctions = require('../controllers/auctions.server.controllers');

module.exports = function(app) {
    app.route('/api/v1/auctions')
        .get(auctions.getAll)
        .post(auctions.create);

    app.route('/api/v1/auctions/:auctionId')
        .get(auctions.getOne)
        .patch(auctions.alter);

    app.route('/api/v1/auctions/:auctionId/bids')
        .get(auctions.viewBids)
        .post(auctions.makeBid);
};