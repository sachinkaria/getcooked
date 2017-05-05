'use strict';

let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

//and create our instances
let app = express();
let router = express.Router();

let port = 3001;

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
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

//Use our router configuration when we call /api
app.use('/', router);

//starts the server and listens for requests
app.listen(port, function() {
    console.log('api running on port ${port}');
});

//db config
mongoose.connect('mongodb://localhost/get-cooked');
// mongoose.connect('mongodb://sachinkaria:manchester04@ds161890.mlab.com:61890/get-cooked');