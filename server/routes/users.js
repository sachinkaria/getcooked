const AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


module.exports = function(app) {
    // Registration route
    app.post('/auth/register', AuthenticationController.register);

    // Login route
    app.post('/auth/login', requireLogin, AuthenticationController.login);

    // search chefs
    app.get('/search', function(req, res) {
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
};