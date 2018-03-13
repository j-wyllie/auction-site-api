const express = require('express'),
    bodyParser = require('body-parser');



module.exports = function() {
    const app = express();

    app.use(bodyParser.json());

    //require('../app/routes/auctions.server.routes')(app);
    require('../app/routes/database.server.routes')(app);
   // require('../app/routes/photos.server.routes')(app);
   // require('../app/routes/users.server.routes')(app);

    return app;
};