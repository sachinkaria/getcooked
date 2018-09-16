'use strict';

const Message = require('../models/message');
const Booking = require('../models/booking');
const ObjectId = require('mongodb').ObjectId;

module.exports.create = create;

function create(req, res) {
  let BOOKING;
  const _booking = req.params.id;
  const _sender = req.user._id;
  const body = req.body.message;

  const MESSAGE = new Message({ _sender, _booking, body });
  console.log('creating message', MESSAGE);

  Booking.findOne({_id: ObjectId(_booking)}, function(err, booking){
    booking.messages.push(MESSAGE._id);
    booking.save((err) => {
      if (err) {
        console.log(err);
        return err;
      }
      BOOKING = booking;
    });
  });

  MESSAGE.save((err, msg) => {
    if (err) {
      console.log(err);
      return err;
    }
    return res.send(BOOKING);
  });
}
