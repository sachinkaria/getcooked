const ConversationController = require('../controllers/conversation');
const express = require('express');
const passport = require('passport');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
    app.get('/conversations', requireAuth, ConversationController.list);
    app.post('/conversations/create', requireAuth, ConversationController.create);
};