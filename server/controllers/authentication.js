'use strict';

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const config = require('../config/main');
const request = require('superagent');
const async = require('async');
const Mailer = require('../services/mailer');
const resetPasswordTemplate = require('../services/emailTemplates/resetPasswordTemplate');

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

      sendSignupSlackNotification(user, 'event host');

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

      sendSignupSlackNotification(user, 'caterer');

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

exports.forgotPassword = (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
          res.send(err);
          return res.redirect('/forgot');
        }


        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save((err) => {
          done(err, token, user);
        });
      });
    },
    (token, user, done) => {
      const HOSTNAME = 'http://'.concat(req.headers.host).concat(`/reset/${token}`);
      const emailData = {
        subject: 'Password reset',
        recipient: user.email
      };

      // send email to approve profile
      const mailer = new Mailer(emailData, resetPasswordTemplate(HOSTNAME, user));
      mailer.send();
      done();
    }
  ], (err) => {
    if (err) return next(err);
    res.redirect('/forgot');
  });
};

exports.resetPassword = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      res.send(err);
      return res.redirect('/forgot');
    }
    res.redirect(`/reset/${req.params.token}`, {
      user: req.user
    });
  });
};

exports.changePassword = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      res.send(err);
      return res.redirect('back');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save((error) => {
      if (err) return (error);
      return res.redirect('/forgot');
    });
  });
};

function sendSignupSlackNotification(user, role) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackUsersWebHookUrl)
      .send({
        text: `${user.email} just joined Get Cooked as a ${role}.`
      })
      .end();
  }
}