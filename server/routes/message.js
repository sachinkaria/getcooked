const MessageController = require('../controllers/message');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
// inbox
    app.get('/conversations/:id/messages', requireAuth, (req, res) => {
    });

    app.post('/conversations/:id/messages/create', requireAuth, MessageController.sendMessage);
};