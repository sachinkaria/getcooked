'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('./server/config/main');
let passport = require('passport');
let authRoutes = require('./server/routes/user');
let bookingRoutes = require('./server/routes/booking');
let chefRoutes = require('./server/routes/chef');
let conversationRoutes = require('./server/routes/conversation');

//and create our instances
let app = express();
let router = express.Router();

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

authRoutes(router);
bookingRoutes(router);
chefRoutes(router);
conversationRoutes(router);


//Use our router configuration when we call /
app.use('/', router);

//starts the server and listens for requests
app.listen(config.port, function() {
    console.log(`api running on port ${config.port}`);
});

//db config
mongoose.connect(config.database);
// mongoose.connect('mongodb://sachinkaria:manchester04@ds161890.mlab.com:61890/get-cooked');