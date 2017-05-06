'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('./server/config/main');
const AuthenticationController = require('./server/controllers/authentication');
let passportService = require('./server/config/passport');
let passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


//and create our instances
let app = express();
let router = express.Router();
let apiRoutes = express.Router();
let authRoutes = express.Router();

let port = 3001;

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    console.log(res);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

    //and remove cacheing so we get the most recent data
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.get('/search', function(req, res) {
    res.json([{
            "id": 1,
            "name": "Sachin Karia",
            "rating": 4,
            "imageUrl": "images/1.jpg",
            "numberOfRatings": 91
        },
        {
            "id": 2,
            "name": "Jonny Packard",
            "rating": 5,
            "imageUrl": "images/2.jpg",
            "numberOfRatings": 34
        },
        {
            "id": 3,
            "name": "Jeremy's Tacos",
            "rating": 4,
            "imageUrl": "images/3.jpg",
            "numberOfRatings": 8
        },
        {
            "id": 4,
            "name": "Another Truck",
            "rating": 5,
            "imageUrl": "images/4.jpg",
            "numberOfRatings": 21
        }])
});

// Registration route
router.post('/auth/register', AuthenticationController.register);

// Login route
router.post('/auth/login', requireLogin, AuthenticationController.login);

//protected test
router.get('/bookings', requireAuth, (req, res) => {
    res.json({ "bookings":[
        {
            "chefID": "1",
            "type": "Wedding",
            "guests": "1000",
            "budget": "5500",
            "date": "2017-04-28T11:00:00.000Z",
            "confirmed": false
        },
        {
            "chefID": "3",
            "type": "Corporate",
            "guests": "10",
            "budget": "1500",
            "date": "2017-05-02T11:00:00.000Z",
            "confirmed": true
        }
    ]})
});

//Use our router configuration when we call /
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log('api running on port ${port}');
});

//db config
mongoose.connect(config.database);
// mongoose.connect('mongodb://sachinkaria:manchester04@ds161890.mlab.com:61890/get-cooked');