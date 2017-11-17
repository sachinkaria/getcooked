const Review = require('../models/review');
const _ = require('lodash');

module.exports.create = create;
module.exports.list = list;

function list(req, res) {
  Review
    .find({ chef: req.params.id })
    .populate('user', 'firstName')
    .sort('-createdAt')
    .exec((err, reviews) => {
      res.jsonp(reviews);
    });
}

function create(req, res) {
  const REVIEW = req.body;
  const USER = req.user;

  const review = new Review({
    user: USER._id,
    chef: req.params.id,
    overall: REVIEW.overall,
    food: REVIEW.food,
    service: REVIEW.service,
    value: REVIEW.value,
    hygiene: REVIEW.hygiene,
    comment: REVIEW.comment || null
  });

  review.save((err) => {
    if (err) return (err);
    res.jsonp(review);
  });
}
