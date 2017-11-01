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
module.exports.deleteProfilePhoto = deleteProfilePhoto;
module.exports.deleteCoverPhoto = deleteCoverPhoto;
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
      return res.status(400).send({
        message: error.message
      });
    }

    let user = req.user;
    user = _.extend(user, { profilePhoto: response });

    user.save();
    res.jsonp(user);
  });
}

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
      return res.status(400).send({
        message: error.message
      });
    }

    let user = req.user;
    user = _.extend(user, { coverPhoto: response });

    user.save();
    res.jsonp(user);
  });
}

/**
 * Delete profile picture
 */
function deleteProfilePhoto(req, res) {
  const USER = req.user;
  const URL_PARTS = USER.profilePhoto.split('/');
  const IMAGE_FILENAME = `/images/user-${USER.id}/${URL_PARTS[URL_PARTS.length - 1]}`;

  utils.deleteImage(IMAGE_FILENAME, (err) => {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    }
    let user = req.user;
    user = _.extend(user, { profilePhoto: undefined });
    user.save();
    res.jsonp(user);
  });
}

/**
 * Delete cover picture
 */
function deleteCoverPhoto(req, res) {
  const USER = req.user;
  const URL_PARTS = USER.coverPhoto.split('/');
  const IMAGE_FILENAME = `/images/user-${USER.id}/${URL_PARTS[URL_PARTS.length - 1]}`;

  utils.deleteImage(IMAGE_FILENAME, (err) => {
    if (err) {
      return res.status(400).send({
        message: err.message
      });
    }
    let user = req.user;
    user = _.extend(user, { coverPhoto: undefined });
    user.save();
    res.jsonp(user);
  });
}

/**
 * Update Password
 */
function updatePassword(req, res) {
  // Init Variables
  const passwordDetails = req.body;

  if (req.user) {
    if (passwordDetails.newPassword) {
      User.findById(req.user.id, (err, user) => {
        if (!err && user) {
          user.matchPassword(passwordDetails.currentPassword, (result) => {
            if (result && passwordDetails.newPassword === passwordDetails.verifyPassword) {
              user.password = passwordDetails.newPassword;
              user.save((error) => {
                if (error) {
                  return res.status(400).send({
                    message: error.message
                  });
                }
                res.send(user);
              });
            } else {
              res.status(400).send({
                message: 'Passwords do not match or your current password is incorrect'
              });
            }
          });
        } else {
          res.status(400).send({
            message: 'User is not found'
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'Please provide a new password'
      });
    }
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
}
