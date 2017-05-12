const ConversationController = require('../controllers/conversation');
const MessageController = require('../controllers/message');
const express = require('express');
const passport = require('passport');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
    app.get('/conversations', requireAuth, ConversationController.list);
    app.post('/conversations/create', requireAuth, ConversationController.create);
    app.get('/conversations/:id/messages', requireAuth, ConversationController.get);
    app.post('/conversations/:id/messages/create', requireAuth, MessageController.create);
};