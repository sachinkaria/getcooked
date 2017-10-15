'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');

const utils = require('./utils');

const IMMUTABLE_FIELDS = [
  '_id',
  'roles',
  'messages'
];

module.exports.uploadProfilePhoto = uploadProfilePhoto;
module.exports.uploadCoverPhoto = uploadCoverPhoto;

/**
 * Update user details
 */
exports.update = function (req, res) {
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

/**
 * Get current user details
 */
exports.getCurrentUser = function (req, res) {
  // Init Variables
  const user = req.user;


  if (!user) {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
  res.jsonp(user);
};

/**
 * Upload profile picture
 */
function uploadProfilePhoto(req, res) {
  utils.imageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype
  }, 'profile', (error, response) => {
    if (error) {
      console.log(error);
    }

    let user = req.user;
    user = _.extend(user, { profilePhoto: response });

    user.save();
    res.jsonp(user);
  });
};

/**
 * Upload cover picture
 */
function uploadCoverPhoto(req, res) {
  utils.imageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype
  }, 'cover', (error, response) => {
    if (error) {
      console.log(error);
    }

    let user = req.user;
    user = _.extend(user, { coverPhoto: response });

    user.save();
    res.jsonp(user);
  });
};