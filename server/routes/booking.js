const AuthenticationController = require('../controllers/authentication');
const BookingsController = require('../controllers/bookings');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.get('/api/bookings', requireAuth, BookingsController.list);
  app.post('/api/bookings/create', BookingsController.create);
  app.get('/api/bookings/:id', requireAuth, BookingsController.read);
  app.post('/api/bookings/:id', requireAuth, BookingsController.update);
  app.post('/api/bookings/:id/accept', requireAuth, BookingsController.accept);
  app.get('/api/bookings/:id/decline', requireAuth, BookingsController.decline);
};