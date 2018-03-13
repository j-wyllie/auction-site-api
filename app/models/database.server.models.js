const db = require('../../config/db'),
    fs = require('fs');

exports.reset = function(done) {
    let sql = fs.readFileSync('app/models/queries/create_database.sql').toString();
    db.get_pool().query(sql, function(err, result) {
        if (err) return done(false);
        done(true);
    });
};

exports.resample = function(done) {
    let sql = fs.readFileSync('app/models/queries/load_data.sql').toString();
    db.get_pool().query(sql, function(err, result) {
        if (err) return done(false);
        done(true);
    });
}