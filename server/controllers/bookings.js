const Booking = require('../models/booking');
const User = require('../models/user');
const twilio = require('./twilio');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const request = require('superagent');
const config = require('../config/main');
const stripe = require('stripe')(config.stripe_secret_key);
const Mailer = require('../services/mailer');
const paymentDetailsTemplate = require('../services/emailTemplates/updatePaymentTemplate');
const enquiryTemplate = require('../services/emailTemplates/bookingEnquiryTemplate');


module.exports.create = create;
module.exports.list = list;
module.exports.read = read;
module.exports.accept = accept;
module.exports.decline = decline;

function list(req, res) {
  const user = req.user;
  Booking
    .find({ $or: [{ user: user._id }, { chef: user._id }] })
    .populate('user', 'firstName')
    .populate('chef', 'profilePhoto displayName')
    .sort('-createdAt')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function accept(req, res) {
  const BOOKING_ID = req.params.id;
  Booking.findOne({ _id: BOOKING_ID })
    .populate('user', 'firstName email mobileNumber')
    .exec((err, booking) => {
    _.extend(booking, { status: 'accepted' });
    booking.save();
    res.jsonp(booking);
  });
}

function decline(req, res) {
  const BOOKING_ID = req.params.id;
  Booking.findOne({ _id: BOOKING_ID }).exec((err, booking) => {
    _.extend(booking, { status: 'declined' });
    booking.save();
    res.jsonp(booking);
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
  const USER = BOOKING.contactDetails;

  const booking = new Booking({
    user: USER._id,
    chef: BOOKING.chef,
    eventType: BOOKING.eventType,
    date: BOOKING.date,
    numberOfPeople: BOOKING.numberOfPeople,
    additionalInformation: BOOKING.additionalInformation || null,
    address: {
      line1: BOOKING.address_line1,
      line2: BOOKING.address_line2,
      city: BOOKING.city,
      postcode: BOOKING.postcode,
    },
    budget: BOOKING.budget,
    services: BOOKING.services,
    foodServices: BOOKING.foodServices,
    contactDetails: BOOKING.contactDetails
  });

  User.findOne({ _id: BOOKING.chef }, 'firstName mobileNumber companyEmail phoneCode contactNumber stripe subscription', (error, chef) => {
    if (error) return (error);

    if (chef.subscription.status !== 'active' && chef.stripe.customerId) {
      const TIME = moment().endOf('month').add(1, 'days').subtract(12, 'hours');
      const SUBSCRIPTION_START_DATE = moment(TIME).unix();

      console.log('Adding subscription to user', chef.stripe.customerId);
      stripe.subscriptions.create({
        customer: chef.stripe.customerId,
        billing_cycle_anchor: SUBSCRIPTION_START_DATE,
        coupon: 'free_month',
        items: [{
          plan: 'basic_monthly'
        }]
      }, (err, subscription) => {
        if (err) return err;

        chef.subscription.id = subscription.id;
        chef.subscription.plan = subscription.plan.id;
        chef.subscription.currency = subscription.plan.currency;
        chef.subscription.status = 'active';
        chef.save((saveErr) => {
          if (saveErr) return saveErr;

          const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/bookings');
          const MESSAGE = `Hi ${chef.firstName}! You have a new enquiry from ${USER.firstName}. Event date: ${moment(booking.date).format('Do MMM YY')}, Guests: ${booking.numberOfPeople}, Budget: £${booking.budget}. Your bookings: ${HOSTNAME}`;
          const ENQUIRY_EMAIL_DATA = {
            subject: 'New booking request',
            recipient: chef.companyEmail
          };

          const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, enquiryTemplate(chef, USER, booking, HOSTNAME));
          enquiryMailer.send();

          if (chef.contactNumber) twilio.sendSMS(chef.contactNumber, MESSAGE);
          booking.save((bookingErr) => {
            if (bookingErr) return (bookingErr);

            sendNewBookingSlackNotification(USER);
            return res.jsonp(booking);
          });
        });
      });
    } else {
      const HOSTNAME = 'http://'.concat(req.headers.host).concat('/dashboard/bookings');
      const hostname = 'http://'.concat(req.headers.host).concat('/setup/payment');
      const MESSAGE = `Hi ${chef.firstName}! You have a new enquiry from ${USER.firstName}. Event date: ${moment(booking.date).format('Do MMM YY')}, Guests: ${booking.numberOfPeople}, Budget: £${booking.budget}. Your bookings: ${HOSTNAME}`;
      const EMAIL_DATA = {
        subject: 'Update your payment details',
        recipient: chef.companyEmail
      };
      const ENQUIRY_EMAIL_DATA = {
        subject: 'New booking request',
        recipient: chef.companyEmail
      };

      if (!chef.stripe.customerId) chef.status = 'unlisted';

      chef.save((err) => {
        const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, enquiryTemplate(chef, USER, booking, HOSTNAME));
        enquiryMailer.send();

        if (!chef.stripe.customerId) {
          const mailer = new Mailer(EMAIL_DATA, paymentDetailsTemplate(chef, hostname));
          mailer.send();
        }

        if (err) return err;
        if (chef.contactNumber) twilio.sendSMS(chef.contactNumber, MESSAGE);
        booking.save((saveErr) => {
          if (saveErr) return (saveErr);
          sendNewBookingSlackNotification(USER);
          return res.jsonp(booking);
        });
      });
    }
  });
}

function sendNewBookingSlackNotification(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackBookingsWebHookUrl)
      .send({
        text: `${user.email} just sent a new booking request.`
      })
      .end();
  }
}
