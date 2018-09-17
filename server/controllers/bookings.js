const Booking = require('../models/booking');
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const User = require('../models/user');
const twilio = require('./twilio');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const request = require('superagent');
const config = require('../config/main');
const Mailer = require('../services/mailer');
const Message = require('../models/message');
const enquiryTemplate = require('../services/emailTemplates/bookingEnquiryTemplate');
const acceptedBookingTemplate = require('../services/emailTemplates/acceptedBookingTemplate');


module.exports.create = create;
module.exports.list = list;
module.exports.read = read;
module.exports.accept = accept;
module.exports.decline = decline;

function list(req, res) {
  const user = req.user;
  Booking
    .find({ $or: [{ user: user._id }, { chef: user._id }]})
    .populate('user', 'firstName')
    .populate('chef', 'profilePhoto displayName')
    .sort('-createdAt')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function accept(req, res) {
  const BOOKING_ID = req.params.id;
  const MESSAGE = req.body.message;
  const USER_ID = req.user._id;

  Booking.findOne({_id: BOOKING_ID})
    .populate('user', 'firstName email mobileNumber')
    .populate('chef', 'id displayName profilePhoto companyEmail phoneCode contactNumber stripe subscription')
    .exec((err, booking) => {
      if (err) return err;
      const CHEF = booking.chef;

      const NEW_MESSAGE = new Message({_booking: BOOKING_ID, _sender: USER_ID, body: MESSAGE});

      NEW_MESSAGE.save((error, msg) => {
        if (error) return error;

        _.extend(booking, { messages: [msg.id] });
        _.extend(booking, { status: 'accepted' });
        booking.save((bookingErr, savedBooking) => {
          if (bookingErr) return bookingErr;

          const USER = savedBooking.user;
          const ENQUIRY_EMAIL_DATA = {
            subject: `Catering Interest - ${_.startCase(_.toLower(CHEF.displayName))}`,
            recipient: USER.email
          };
          const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/events');
          const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, acceptedBookingTemplate(savedBooking.chef, USER, savedBooking, HOSTNAME));
          enquiryMailer.send();
          return res.jsonp(savedBooking);
        });
      });
    });
}

function decline(req, res) {
  const BOOKING_ID = req.params.id;
  Booking.findOne({_id: BOOKING_ID}).exec((err, booking) => {
    _.extend(booking, {status: 'declined'});
    booking.save();
    res.jsonp(booking);
  });
}

function read(req, res) {
  const BOOKING_ID = req.params.id;
  const USER = req.user;
  Booking
    .findOne({_id: BOOKING_ID})
    .populate('user', 'email mobileNumber firstName lastName')
    .populate('chef', 'profilePhoto displayName stripe subscription')
    .populate('messages', '_sender _recipient status date body')
    .exec((err, booking) => {
      if (!booking.read && USER.role === 'chef') {
        booking.read = true;
        booking.save();
      }

      res.jsonp(booking);
    });
}

function create(req, res) {
  const BOOKING = req.body || req;
  const USER = BOOKING.user;

  const booking = new Booking({
    user: BOOKING.user,
    chef: BOOKING.chef,
    eventType: BOOKING.eventType,
    date: BOOKING.date,
    numberOfPeople: BOOKING.numberOfPeople,
    additionalInformation: BOOKING.additionalInformation || null,
    address: BOOKING.address || {
      line1: BOOKING.address_line1,
      line2: BOOKING.address_line2,
      city: BOOKING.city,
      postcode: BOOKING.postcode,
    },
    budget: BOOKING.budget,
    services: BOOKING.services,
    foodServices: BOOKING.foodServices,
    contactDetails: BOOKING.contactDetails,
    kitchenAvailable: BOOKING.kitchenAvailable,
    additionalEquipment: BOOKING.additionalEquipment,
    foodStyle: BOOKING.foodStyle,
    staffRequired: BOOKING.staffRequired,
    startTime: BOOKING.startTime,
    endTime: BOOKING.endTime,
    openToVegan: BOOKING.openToVegan,
    openToVegetarian: BOOKING.openToVegetarian
  });

  User.findOne({_id: BOOKING.chef}, 'firstName mobileNumber companyEmail phoneCode contactNumber stripe subscription', (error, chef) => {
    if (error) return (error);
    const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/bookings');
    const MESSAGE = `You have a new enquiry for ${booking.numberOfPeople} people with a budget of £${booking.budget}. Your bookings: ${HOSTNAME}`;
    const ENQUIRY_EMAIL_DATA = {
      subject: 'New Booking Request',
      recipient: chef.companyEmail
    };

    const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, enquiryTemplate(chef, USER, booking, HOSTNAME));
    enquiryMailer.send();

    if (chef.contactNumber) twilio.sendSMS(chef.contactNumber, MESSAGE);
    booking.save((bookingErr) => {
      const ID = BOOKING._id && BOOKING._id;
      if (bookingErr) return (bookingErr);

      if (ID) {
        Event.findOne({_id: ObjectId(ID)}).exec((eventErr, event) => {
          if (eventErr) return eventErr;

          if (event.bookings) {
            const NEW_BOOKINGS = event.bookings.concat([booking._id]);
            _.extend(event, { bookings: NEW_BOOKINGS });
            event.save();
          } else {
            event.bookings = [booking._id];
            event.save();
          }

          // sendNewBookingSlackNotification(USER);
          return res.jsonp(booking);
        });
      } else {
        // sendNewBookingSlackNotification(USER);
        return res.jsonp(booking);
      }
    });
  });
}

// function sendNewBookingSlackNotification(user) {
//   if (process.env.NODE_ENV === 'production') {
//     request
//       .post(config.slackBookingsWebHookUrl)
//       .send({
//         text: `${user.email} just sent a new booking request.`
//       })
//       .end();
//   }
// }
