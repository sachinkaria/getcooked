const AuthenticationController = require('../controllers/authentication');
const EventsController = require('../controllers/events');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.post('/api/events/create', EventsController.create);
};