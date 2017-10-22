const _ = require('lodash');
const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

module.exports.listChefs = list;
module.exports.getChef = read;

function list(req, res) {
  User.find({ role: 'chef' }).exec((err, chefs) => {
    res.jsonp(chefs);
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