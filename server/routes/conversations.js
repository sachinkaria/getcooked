const AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
// inbox
    app.get('/conversations', requireAuth, (req, res) => {
    });

    app.post('/conversations/create', requireAuth, (req, res) => {
    });

};