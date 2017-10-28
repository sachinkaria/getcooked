'use strict';

const jwt = require('jsonwebtoken'),
  crypto = require('crypto'),
  User = require('../models/user'),
  config = require('../config/main');

function generateToken(user) {
  return jwt.sign(user, config.jwt_secret, {});
}

// Set user info from request
function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    role: request.role
  };
}

exports.login = (req, res, next) => {
  const userInfo = setUserInfo(req.user);
  res.status(200).json({
    token: 'JWT '.concat(generateToken(userInfo)),
    user: userInfo
  });
};


// Registration Route

exports.register = (req, res, next) => {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    const user = new User({
      email,
      password
    });

    user.save((err, user) => {
      if (err) { return next(err); }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT '.concat(generateToken(userInfo)),
        user: userInfo
      });
    });
  });
};

// Registration Chef Route

exports.registerChef = (req, res, next) => {
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;


  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' });
    }

    // If email is unique and password was provided, create account
    let user = new User(req.body);

    user.role = 'chef';

    user.save((err, user) => {
      if (err) { return next(err); }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT '.concat(generateToken(userInfo)),
        user: userInfo
      });
    });
  });
};

// Authorization Middleware

// Role authorization check
exports.roleAuthorization = (role) => {
  return (req, res, next) => {
    const user = req.user;

    User.findById(user._id, function (err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role === role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    });
  };
};