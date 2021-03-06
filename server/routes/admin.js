const AdminController = require('../controllers/admin');
const Authentication = require('../controllers/authentication');
const express = require('express');
const passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
  app.get('/api/admin/chefs', requireAuth, Authentication.roleAuthorization('admin'), AdminController.listChefs);
  app.get('/api/admin/users', requireAuth, Authentication.roleAuthorization('admin'), AdminController.listUsers);
  app.get('/api/admin/events', requireAuth, Authentication.roleAuthorization('admin'), AdminController.listEvents);
  app.post('/api/admin/events/:id', requireAuth, Authentication.roleAuthorization('admin'), AdminController.updateEvent);
  app.get('/api/admin/bookings', requireAuth, Authentication.roleAuthorization('admin'), AdminController.listBookings);
  app.post('/api/admin/bookings/create', requireAuth, Authentication.roleAuthorization('admin'), AdminController.createBooking);
  app.get('/api/admin/stripe/coupons', requireAuth, Authentication.roleAuthorization('admin'), AdminController.addMonthlyCoupons);
  app.get('/api/admin/chefs/:id', requireAuth, Authentication.roleAuthorization('admin'), AdminController.getChef);
  app.get('/api/admin/chefs/:id/list', requireAuth, Authentication.roleAuthorization('admin'), AdminController.list);
  app.get('/api/admin/chefs/:id/unlist', requireAuth, Authentication.roleAuthorization('admin'), AdminController.unlist);
  app.get('/api/admin/chefs/:id/approve', requireAuth, Authentication.roleAuthorization('admin'), AdminController.approve);
  app.get('/api/admin/chefs/:id/bookings', requireAuth, Authentication.roleAuthorization('admin'), AdminController.listBookingsByChef);
  app.post('/api/admin/emails/incomplete', requireAuth, Authentication.roleAuthorization('admin'), AdminController.sendIncompleteProfileEmail);
  app.post('/api/admin/chefs/:id/photos', requireAuth, Authentication.roleAuthorization('admin'), AdminController.uploadPhotos);
};