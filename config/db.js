const mysql = require('mysql');

let state = {
    pool: null
};

exports.connect = function(done) {
    state.pool = mysql.createPool({
        host: 'mysql3.csse.canterbury.ac.nz',
        user: 'jwy31',
        password: "62376261",
        database: "jwy31",
        multipleStatements: true
    });
    done();
};

exports.get_pool = function() {
    return state.pool;
};