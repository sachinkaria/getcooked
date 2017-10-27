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
  app.post('/users/upload-photo/profile', requireAuth, User.uploadProfilePhoto);
  app.post('/users/upload-photo/cover', requireAuth, User.uploadCoverPhoto);

  // Get profile route
  app.get('/users/me', requireAuth, User.getCurrentUser);
};