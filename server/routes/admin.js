const AdminController = require('../controllers/admin');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/api/admin/chefs', requireAuth, AdminController.listChefs);
  app.get('/api/admin/users', requireAuth, AdminController.listUsers);
  app.get('/api/admin/chefs/:id', requireAuth, AdminController.getChef);
  app.get('/api/admin/chefs/:id/list', requireAuth, AdminController.list);
  app.get('/api/admin/chefs/:id/unlist', requireAuth, AdminController.unlist);
  app.get('/api/admin/chefs/:id/approve', requireAuth, AdminController.approve);
};