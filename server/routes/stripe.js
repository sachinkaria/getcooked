const StripeController = require('../controllers/stripe'),
  express = require('express'),
  passportService = require('../config/passport'),
  passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app) {
  // Registration route
  app.post('/api/stripe/customers', requireAuth, StripeController.createCustomer);
  app.post('/api/stripe/sources', requireAuth, StripeController.createSource);
  app.get('/api/stripe/sources/:id', requireAuth, StripeController.getSource);
};
