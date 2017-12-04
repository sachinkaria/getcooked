const _ = require('lodash');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const twilio = require('./twilio');

module.exports.listChefs = allChefs;
module.exports.listUsers = allUsers;
module.exports.getChef = read;
module.exports.approve = approve;
module.exports.list = list;
module.exports.unlist = unlist;

function allChefs(req, res) {
  User.find({ role: 'chef' }).exec((err, chefs) => {
    res.jsonp(chefs);
  });
}

function allUsers(req, res) {
  User.find({ role: 'member' }).exec((err, members) => {
    res.jsonp(members);
  });
}

function read(req, res) {
  const id = req.params.id;
  User.find({ _id: ObjectId(id) }).exec((err, chefs) => {
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
      _.extend(chef, { status: 'listed' });
    }
    chef.save((error) => {
      if (error) return error;

      const MESSAGE = `Hi ${chef.firstName}! Congratulations! Your Get Cooked profile has been approved and is now publicly listed.`;
      if (chef.contactNumber) twilio.sendSMS(chef.contactNumber, MESSAGE);
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