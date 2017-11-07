const AuthenticationController = require('../controllers/authentication');
const BookingsController = require('../controllers/bookings');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.get('/bookings', requireAuth, BookingsController.list);
  app.post('/bookings/create', requireAuth, BookingsController.create);
};