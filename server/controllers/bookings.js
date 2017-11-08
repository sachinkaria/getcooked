const Booking = require('../models/booking');

module.exports.create = create;
module.exports.list = list;

function list(req, res) {
  const user = req.user;
  Booking
    .find({ $or: [{ user: user._id }, { chef: user._id }] })
    .sort('-lastUpdated')
    .exec((err, bookings) => {
      res.jsonp(bookings);
    });
}

function create(req, res) {
  console.log('creating booking');
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
    console.log('saving booking', booking);
    if (err) console.log(err);
    console.log('booking saved');
    res.jsonp(booking);
  });
}
