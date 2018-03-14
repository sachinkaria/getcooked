const _ = require('lodash');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const twilio = require('./twilio');
const utils = require('./utils');
const Mailer = require('../services/mailer');
const approvalTemplate = require('../services/emailTemplates/approvalTemplate');

module.exports.listChefs = allChefs;
module.exports.listUsers = allUsers;
module.exports.getChef = read;
module.exports.approve = approve;
module.exports.list = list;
module.exports.unlist = unlist;
module.exports.uploadPhotos = uploadPhotos;

function allChefs(req, res) {
  User.find({role: 'chef'}).exec((err, chefs) => {
    res.jsonp(chefs);
  });
}

function allUsers(req, res) {
  User.find({role: 'member'}).exec((err, members) => {
    res.jsonp(members);
  });
}

function read(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
    let chef = chefs[0];
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function approve(req, res) {
  const id = req.params.id;
  User.find({ _id: ObjectId(id) }).exec((err, chefs) => {
    let chef = chefs[0];

    if (chef.status === 'pending') {
      _.extend(chef, {status: 'listed'});
    }
    chef.save((error) => {
      if (error) return error;

      const emailData = {
        subject: 'Congratulations! Your profile has been approved.',
        recipient: chef.email
      };

      // send email to approve profile
      const mailer = new Mailer(emailData, approvalTemplate(chef));
      mailer.send();

      chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
      res.jsonp(chef);
    });
  });
}

function list(req, res) {
  const id = req.params.id;
  User.find({ _id: ObjectId(id) }).exec((err, chefs) => {
    let chef = chefs[0];

    if (chef.status === 'unlisted') {
      _.extend(chef, { status: 'listed' });
    }
    chef.save();
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function unlist(req, res) {
  const id = req.params.id;
  User.find({ _id: ObjectId(id) }).exec((err, chefs) => {
    let chef = chefs[0];

    if (chef.status === 'listed') {
      _.extend(chef, { status: 'unlisted' });
    }
    chef.save();
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function uploadPhotos(req, res) {
  const id = req.params.id;
  User.find({ _id: ObjectId(id) }).exec((err, chefs) => {
    const chef = chefs[0];
    utils.imageUploader({
      data_uri: req.body.data_uri,
      filename: req.body.filename,
      filetype: req.body.filetype,
      userId: req.user._id
    }, 'photos', (error, response) => {
      if (error) {
        return res.status(400).send({
          message: error.message
        });
      }
      chef.photos.push({ src: response });
      chef.save();
      res.jsonp(chef);
    });
  });
}