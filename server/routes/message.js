const MessageController = require('../controllers/message');
const express = require('express');
const passport = require('passport');


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.post('/api/bookings/:id/messages', requireAuth, MessageController.create);
};