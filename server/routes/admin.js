const AdminController = require('../controllers/admin');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/admin/chefs', requireAuth, AdminController.listChefs);
  app.get('/admin/users', requireAuth, AdminController.listUsers);
  app.get('/admin/chefs/:id', requireAuth, AdminController.getChef);
  app.get('/admin/chefs/:id/list', requireAuth, AdminController.list);
  app.get('/admin/chefs/:id/unlist', requireAuth, AdminController.unlist);
  app.get('/admin/chefs/:id/approve', requireAuth, AdminController.approve);
};