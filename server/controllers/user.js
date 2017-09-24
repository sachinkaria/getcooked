
'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const mongoose = require('mongoose');

const IMMUTABLE_FIELDS = [
  '_id',
  'roles',
  'messages'
];

/**
 * Update user details
 */
exports.update = function (req, res) {
  console.log(req.body);
  console.log(req.user);
  // Init Variables
  let user = req.user;

  // In order to prevent a user from maliciously changing sensitive, permanent or verified data, we remove the following:
  IMMUTABLE_FIELDS.forEach((field) => {
    delete req.body[field];
  });

  if (!user) {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }

  // Update existing user
  user = _.extend(user, req.body);
  user.updated = Date.now();

  user.save()
    .then(() => req.login(user, onLogin), (err) => {
      return res.status(400).send({
        message: err
      });
    });

  function onLogin(err) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    }
  }
  res.jsonp(user);
};