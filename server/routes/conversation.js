const ConversationController = require('../controllers/conversation');
const MessageController = require('../controllers/message');
const express = require('express');
const passport = require('passport');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
    app.get('/api/conversations', requireAuth, ConversationController.list);
    app.post('/api/conversations/create', requireAuth, ConversationController.create);
    app.get('/api/conversations/:id/messages', requireAuth, ConversationController.get);
    app.post('/api/conversations/:id/messages/create', requireAuth, MessageController.create);
};