const database = require('../controllers/database.server.controllers'),
    authentication = require('/home/cosc/student/jwy31/Documents/seng365/assignment_1/jwy31/config/authentication.js');;

module.exports = function(app) {
    app.route('/api/v1/reset')
        .post(authentication.isAuthorised, database.reset);

    app.route('/api/v1/resample')
        .post(authentication.isAuthorised, database.resample);
};