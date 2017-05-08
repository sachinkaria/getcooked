const AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
// bookings
    app.get('/bookings', requireAuth, (req, res) => {
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
};