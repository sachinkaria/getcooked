const AdminController = require('../controllers/admin');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/admin/chefs', requireAuth, AdminController.listChefs);
  app.get('/admin/chefs/:id', requireAuth, AdminController.getChef);
};