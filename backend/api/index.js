const express = require('express');

let app = express.Router();
require('./routes/userRoute')(app);
require('./routes/productRoute')(app);
require('./routes/orderRoute')(app);
require('./routes/uploadroute')(app);

module.exports = app;