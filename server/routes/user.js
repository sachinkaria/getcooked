const AuthenticationController = require('../controllers/authentication'),
  User = require('../controllers/user'),
  express = require('express'),
  passportService = require('../config/passport'),
  passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


module.exports = function (app) {
  // Registration route
  app.post('/users/create', AuthenticationController.register);

  // Login route
  app.post('/users/login', requireLogin, AuthenticationController.login);

  // Update route
  app.put('/users', requireAuth, User.update);
  app.put('/users/password', requireAuth, User.updatePassword);

  // Upload photos
  app.post('/users/photos/profile', requireAuth, User.uploadProfilePhoto);
  app.post('/users/photos/cover', requireAuth, User.uploadCoverPhoto);

  // Delete photos
  app.delete('/users/photos/profile', requireAuth, User.deleteProfilePhoto);
  app.delete('/users/photos/cover', requireAuth, User.deleteCoverPhoto);


  // Get profile route
  app.get('/users/me', requireAuth, User.getCurrentUser);
};