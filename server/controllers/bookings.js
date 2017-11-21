const Booking = require('../models/booking');
const User = require('../models/user');
const twilio = require('./twilio');
const _ = require('lodash');

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
  Booking
    .findOne({ _id: BOOKING_ID })
    .populate('user', 'email mobileNumber firstName lastName')
    .populate('chef', 'profilePhoto displayName')
    .exec((err, booking) => {
      if (!booking.read) {
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
    }
  });

  booking.save((err) => {
    if (err) return (err);

    User.findOne({ _id: BOOKING.chef }, 'firstName mobileNumber phoneCode contactNumber', (error, chef) => {
      if (error) return (error);

      const MESSAGE = `Hi ${chef.firstName}! You have a new enquiry from ${USER.firstName} ${USER.lastName}. You can check out more details about this enquiry on your dashboard.`;
      if (chef.contactNumber) twilio.sendSMS(chef.contactNumber, MESSAGE);
      res.jsonp(booking);
    });
  });
}
