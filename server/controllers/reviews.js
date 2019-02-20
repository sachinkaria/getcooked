const Review = require('../models/review');
const Booking = require('../models/booking');
const _ = require('lodash');
const request = require('superagent');
const config = require('../config/main');

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

  review.save((error) => {
    if (error) return (error);
    Booking.findOne({ _id: req.params.bookingId }).exec((err, booking) => {
      if (err) return (err);
      _.extend(booking, { review: review._id });
      booking.save();
      sendReviewSlackNotification(USER);
      res.jsonp(booking);
    });
  });
}


function sendReviewSlackNotification(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackBookingsWebHookUrl)
      .send({
        text: `${user.email} just left a review for her event!`
      })
      .end();
  }
}