const Booking = require('../models/booking');
const twilio = require('./twilio');

module.exports.create = create;
module.exports.list = list;

function list(req, res) {
  const user = req.user;
  Booking
    .find({ $or: [{ user: user._id }, { chef: user._id }] })
    .populate('user', 'email mobileNumber firstName lastName')
    .populate('chef', 'profilePhoto displayName')
    .sort('-lastUpdated')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function create(req, res) {
  const BOOKING = req.body;
  const USER_ID = req.user._id;

  const booking = new Booking({
    user: USER_ID,
    chef: BOOKING.chef,
    event_type: BOOKING.eventType,
    date: BOOKING.date,
    number_of_people: BOOKING.numberOfPeople,
    additional_information: BOOKING.additionalInformation || null
  });

  booking.save((err) => {
    if (err) return (err);

    const CHEF = booking.chef;
    const USER = booking.user;

    const MESSAGE = `Hi ${CHEF.name}! You have a new enquiry from ${USER.firstName} ${USER.lastName}. You can check out more details about this enquiry on your dashboard.`
    if (CHEF.mobileNumber) twilio.sendSMS(CHEF.mobileNumber, MESSAGE);
    res.jsonp(booking);
  });
}
