const StripeController = require('../controllers/stripe'),
  express = require('express'),
  passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = function (app) {
  // Stripe routes
  app.post('/api/stripe/customers', requireAuth, StripeController.createCustomer);
  app.get('/api/stripe/subscriptions/:id', requireAuth, StripeController.getSubscription);
  app.post('/api/stripe/subscriptions/cancel', requireAuth, StripeController.cancelSubscription);
  app.post('/api/stripe/subscriptions/resume', requireAuth, StripeController.resumeSubscription);
  app.post('/api/stripe/sources', requireAuth, StripeController.createSource);
  app.get('/api/stripe/sources/:id', requireAuth, StripeController.getSource);
};
