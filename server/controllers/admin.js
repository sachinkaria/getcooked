const _ = require('lodash');

const keys = require('../config/main');

const stripe = require('stripe')(keys.stripe_secret_key);
const User = require('../models/user');
const Event = require('../models/event');
const Booking = require('../models/booking');
const BookingController = require('./bookings');
const ObjectId = require('mongodb').ObjectId;
const twilio = require('./twilio');
const utils = require('./utils');
const Mailer = require('../services/mailer');
const approvalTemplate = require('../services/emailTemplates/approvalTemplate');
const completeProfileTemplate = require('../services/emailTemplates/completeProfileTemplate');

module.exports.listChefs = allChefs;
module.exports.listUsers = allUsers;
module.exports.listEvents = allEvents;
module.exports.listBookings = allBookings;
module.exports.listBookingsByChef = allBookingsByChef;
module.exports.getChef = getChef;
module.exports.approve = approve;
module.exports.list = list;
module.exports.unlist = unlist;
module.exports.uploadPhotos = uploadPhotos;
module.exports.addMonthlyCoupons = addMonthlyCoupons;
module.exports.createBooking = createBooking;
module.exports.updateEvent = updateEvent;
module.exports.sendIncompleteProfileEmail = sendIncompleteProfileEmail;

function allChefs(req, res) {
  User.find({role: 'chef'}).exec((err, chefs) => {
    const CHEFS = [];
    chefs.forEach((chef) => {
      chef.findAcceptedBookings(function (err, bookings) {
        const CHEF_OBJECT = chef.toObject();
        CHEF_OBJECT.acceptedBookings = bookings;
        CHEFS.push(CHEF_OBJECT);
        if (CHEFS.length === chefs.length) res.jsonp(CHEFS);
      });
    });
  });
}

function allUsers(req, res) {
  User.find({role: 'member'}).exec((err, members) => {
    res.jsonp(members);
  });
}

function allEvents(req, res) {
  Event
    .find({})
    .populate('user', 'firstName lastName email mobileNumber')
    .populate({
      path: 'bookings',
      select: {status: 1, read: 1},
      populate: {
        path: 'chef',
        select: {displayName: 1}
      }
    })
    .populate({
      path: 'bookings',
      populate: {
        path: 'messages',
        select: { body: 1, date: 1, status: 1 },
        populate: {
          path: '_sender',
          select: { displayName: 1, firstName: 1 }
        }
      }
    })
    .sort('-updatedAt')
    .exec((err, events) => {
      res.jsonp(events);
    });
}

function allBookings(req, res) {
  Booking.find({})
    .populate('chef', 'profilePhoto displayName')
    .sort('-updatedAt')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function allBookingsByChef(req, res) {
  const ID = req.params.id;
  Booking.find({chef: ObjectId(ID)})
    .populate('chef', 'profilePhoto displayName')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function getChef(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
    let chef = chefs[0];
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function approve(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
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
      const HOSTNAME = 'http://'.concat(req.headers.host).concat(`/caterers/profile/${chef._id}`);
      const mailer = new Mailer(emailData, approvalTemplate(chef, HOSTNAME));
      mailer.send();

      chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
      res.jsonp(chef);
    });
  });
}

function list(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
    let chef = chefs[0];

    if (chef.status === 'unlisted') {
      _.extend(chef, {status: 'listed'});
    }
    chef.save();
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function unlist(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
    let chef = chefs[0];

    if (chef.status === 'listed') {
      _.extend(chef, {status: 'unlisted'});
    }
    chef.save();
    chef = _.omit(chef.toObject(), ['email', 'password', 'mobileNumber', 'firstName', 'lastName']);
    res.jsonp(chef);
  });
}

function createBooking(req, res) {
  return BookingController.create(req, res);
}

function updateEvent(req, res) {
  const EVENT_ID = req.params.id;
  const STATUS = req.body;
  Event.findOne({_id: EVENT_ID}).exec((err, event) => {
    _.extend(event, STATUS);
    event.save();
    res.jsonp(event);
  });
}

function uploadPhotos(req, res) {
  const id = req.params.id;
  User.find({_id: ObjectId(id)}).exec((err, chefs) => {
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
      chef.photos.push({src: response});
      chef.save();
      res.jsonp(chef);
    });
  });
}

function addMonthlyCoupons(req, res) {
  let CHEFS = [];
  User.find({role: 'chef', 'subscription.status': 'active'}, 'id displayName subscription stripe', (err, chefs) => {
    if (err) return err;

    utils.getChefsWithoutMonthlyBookings(chefs, (chefsWithoutBookings) => {
      CHEFS = chefsWithoutBookings;
      async function addCoupon() {
        for (const chef of CHEFS) {
          const SUBSCRIPTION_ID = chef.subscription.id;
          await stripe.subscriptions.update(SUBSCRIPTION_ID, {
            coupon: 'free_month'
          }, (error, subscription) => {
            if (error) return error;
            console.log('Stripe coupon added for stripe customer', subscription.customer);
          });
        }
      }

      if (CHEFS.length > 0) {
        addCoupon().then((asyncErr) => {
          if (asyncErr) return asyncErr;
          res.sendStatus(200);
        });
      } else {
        res.sendStatus(200);
      }
    });
  });
}

function sendIncompleteProfileEmail(req, res) {
  const NAME = req.body.name;
  const EMAIL = req.body.email;

  const emailData = {
    subject: 'Your profile is almost complete!',
    recipient: EMAIL
  };

  // send email to complete profile
  const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/profile/summary');
  const mailer = new Mailer(emailData, completeProfileTemplate(NAME, HOSTNAME));
  mailer.send();
  res.sendStatus(200);
}