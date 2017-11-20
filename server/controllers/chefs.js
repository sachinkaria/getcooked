const _ = require('lodash');
const User = require('../models/user');
const Review = require('../models/review');
const ObjectId = require('mongodb').ObjectId;
const utils = require('./utils');

module.exports.listChefs = list;
module.exports.getChef = read;

function list(req, res) {
  User.find({ role: 'chef', status: 'listed' }).exec((err, chefs) => {
    res.jsonp(chefs);
  });
}

function read(req, res) {
  const ID = req.params.id;
  User.find({ _id: ObjectId(ID) }).exec((err, chefs) => {
    const chef = chefs[0];
    let rating = null;
    let comments = [];

    Review.find({ chef: chef._id })
      .populate('user', 'firstName')
      .exec((err, reviews) => {
      rating = utils.getChefRating(reviews);
      comments = utils.getChefReviews(reviews);

      const profile = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
      res.jsonp({
        profile,
        rating,
        comments
      });
    });
  });
}