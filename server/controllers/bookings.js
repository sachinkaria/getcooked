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
  const BOOKING = req.body;

  const booking = new Booking(BOOKING);
  booking.save((err) => {
    if (err) return (err);
    res.jsonp(booking);
  });
}
