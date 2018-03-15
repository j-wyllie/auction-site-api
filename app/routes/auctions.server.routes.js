const auctions = require('../controllers/auctions.server.controllers');

module.exports = function(app) {
    app.route('/api/v1/auctions')
        .get(auctions.getAll)
        .post(auctions.create);

    app.route('/api/v1/auctions/:id')
        .get(auctions.getOne)
        .patch(auctions.alter);

    app.route('/api/vi/:id/bids')
        .get(auctions.viewBids)
        .post(auctions.makeBid);
};