'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./server/config/main');
const authRoutes = require('./server/routes/user');
const bookingRoutes = require('./server/routes/booking');
const chefRoutes = require('./server/routes/chef');
const conversationRoutes = require('./server/routes/conversation');

// and create our instances
const app = express();
const router = express.Router();

// now we should configure the API to use bodyParser and look for
// JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// To prevent errors from Cross Origin Resource Sharing, we will set
// our headers to allow CORS with middleware like so:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

  // and remove cacheing so we get the most recent data
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

authRoutes(router);
bookingRoutes(router);
chefRoutes(router);
conversationRoutes(router);


// Use our router configuration when we call /
app.use('/', router);

// starts the server and listens for requests
app.listen(config.port, () => {
  console.log(`api running on port ${config.port}`);
});

// db config
mongoose.connect(config.database);

// mongoose.connect('mongodb://sachinkaria:manchester04@ds161890.mlab.com:61890/get-cooked');
