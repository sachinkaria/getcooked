const AuthenticationController = require('../controllers/authentication');
const ReviewsController = require('../controllers/reviews');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function(app) {
  app.get('/api/chefs/:id/reviews', requireAuth, ReviewsController.list);
  app.post('/api/chefs/:id/bookings/:bookingId/reviews', requireAuth, ReviewsController.create);
};