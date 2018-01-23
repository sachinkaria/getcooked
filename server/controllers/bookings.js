const Booking = require('../models/booking');
const User = require('../models/user');
const twilio = require('./twilio');
const moment = require('moment');
const _ = require('lodash');
const request = require('superagent');
const config = require('../config/main');

module.exports.create = create;
module.exports.list = list;
module.exports.read = read;

function list(req, res) {
  const user = req.user;
  Booking
    .find({ $or: [{ user: user._id }, { chef: user._id }] })
    .populate('user', 'firstName lastName email mobileNumber')
    .populate('chef', 'profilePhoto displayName')
    .sort('-createdAt')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function read(req, res) {
  const BOOKING_ID = req.params.id;
  const USER = req.user;
  Booking
    .findOne({ _id: BOOKING_ID })
    .populate('user', 'email mobileNumber firstName lastName')
    .populate('chef', 'profilePhoto displayName')
    .exec((err, booking) => {
      if (!booking.read && USER.role === 'chef') {
        booking.read = true;
        booking.save();
      }
      res.jsonp(booking);
    });
}

function create(req, res) {
  const BOOKING = req.body;
  const USER = req.user;

  const booking = new Booking({
    user: USER._id,
    chef: BOOKING.chef,
    event_type: BOOKING.eventType,
    date: BOOKING.date,
    number_of_people: BOOKING.numberOfPeople,
    additional_information: BOOKING.additionalInformation || null,
    address: {
      line1: BOOKING.address_line1,
      line2: BOOKING.address_line2,
      city: BOOKING.city,
      postcode: BOOKING.postcode,
    },
    budget: BOOKING.budget
  });

  User.findOne({ _id: BOOKING.chef }, 'firstName mobileNumber phoneCode contactNumber', (error, chef) => {
    if (error) return (error);

    const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/bookings');
    const MESSAGE = `Hi ${chef.firstName}! You have a new enquiry from ${USER.firstName}. Event date: ${moment(booking.date).format('Do MMM YY')}, Guests: ${booking.number_of_people}, Budget: £${booking.budget}. Your bookings: ${HOSTNAME}`;
    if (chef.contactNumber) {
      twilio.sendSMS(chef.contactNumber, MESSAGE);
      booking.save((err) => {
        if (err) return (err);
        sendSignupSlackNotification(USER);
        res.jsonp(booking);
      });
    }
  });
}

function sendSignupSlackNotification(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackBookingsWebHookUrl)
      .send({
        text: `${user.email} just sent a new booking request.`
      })
      .end();
  }
}
