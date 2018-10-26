const _ = require('lodash');
const request = require('superagent');
const User = require('../models/user');
const Review = require('../models/review');
const ObjectId = require('mongodb').ObjectId;
const utils = require('./utils');

module.exports.listChefs = list;
module.exports.getChef = read;

function list(req, res) {
  User.find({ role: 'chef', status: 'listed' }, 'profilePhoto displayName tagLine events', (err, chefs) => {
    const profiles = [];
    let count = 0;
    chefs.forEach(chef => (
      Review.find({ chef: chef._id })
        .populate('user', 'firstName')
        .exec((error, reviews) => {
          if (error) return (error);
          const numberOfReviews = reviews.length;
          const rating = utils.getOverallRating(reviews);
          const profile = _.extend(chef.toJSON(), { rating, numberOfReviews });
          profiles.push(profile);
          count += 1;
          if (count === chefs.length) res.jsonp(profiles);
        })
    ));
  });
}

function read(req, res) {
  const ID = req.params.id;

  User.find({ _id: ObjectId(ID) }).exec((err, chefs) => {
    const chef = chefs[0].toObject();
    let rating = null;
    let comments = [];

    if (chef.social && chef.social.instagram.accessToken) {
      const CODE = chef.social.instagram.accessToken;
      request
        .get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${CODE}`)
        .then((response) => {
          chef.instagramFeed = response.body.data;
          Review.find({ chef: chef._id })
            .populate('user', 'firstName')
            .sort('-createdAt')
            .exec((err, reviews) => {
              rating = utils.getChefRating(reviews);
              comments = utils.getChefReviews(reviews);

              const profile = _.omit(chef, ['email', 'password', 'mobileNumber', 'firstName', 'lastName', 'stripe', 'subscription']);
              res.jsonp({
                profile,
                rating,
                comments
              });
            });
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      Review.find({ chef: chef._id })
        .populate('user', 'firstName')
        .sort('-createdAt')
        .exec((err, reviews) => {
          rating = utils.getChefRating(reviews);
          comments = utils.getChefReviews(reviews);

          const profile = _.omit(chef, ['email', 'password', 'mobileNumber', 'firstName', 'lastName', 'stripe', 'subscription']);
          res.jsonp({
            profile,
            rating,
            comments
          });
        });
    }
  });
}