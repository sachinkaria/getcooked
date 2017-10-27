'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const utils = require('./utils');

const IMMUTABLE_FIELDS = [
  '_id',
  'roles',
  'messages',
  'password'
];

module.exports.uploadProfilePhoto = uploadProfilePhoto;
module.exports.uploadCoverPhoto = uploadCoverPhoto;
module.exports.updatePassword = updatePassword;

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
    filetype: req.body.filetype,
    userId: req.user._id
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
    filetype: req.body.filetype,
    userId: req.user._id
  }, 'cover', (error, response) => {
    if (error) {
      console.log(error);
    }

    let user = req.user;
    user = _.extend(user, { coverPhoto: response });

    user.save();
    res.jsonp(user);
  });
}

/**
 * Update Password
 */
function updatePassword (req, res) {
  // Init Variables
  const passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, (err, user) => {
        if (!err && user) {
          if (user.authenticate(passwordDetails.currentPassword)) {
            console.log('password authenticated');
            if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
              user.password = passwordDetails.newPassword;

              user.save((err) => {
                if (err) {
                  return res.status(400).send({
                    message: err.message
                  });
                }
                req.login(user, (err) => {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    res.send({
                      message: 'Password changed successfully'
                    });
                  }
                });
              });
            } else {
              console.log('passwords dont match');
              res.status(400).send({
                message: 'Passwords do not match'
              });
            }
          } else {
            console.log('current password incorrect');
            res.status(400).send({
              message: 'Current password is incorrect'
            });
          }
        } else {
          console.log('user not found');
          res.status(400).send({
            message: 'User is not found'
          });
        }
      });
    } else {
      console.log('no new password');
      res.status(400).send({
        message: 'Please provide a new password'
      });
    }
  } else {
    console.log('user not signed in');
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
