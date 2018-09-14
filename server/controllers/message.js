'use strict';

const Message = require('../models/message');
const Booking = require('../models/booking');
const ObjectId = require('mongodb').ObjectId;

module.exports.create = create;

function create(userId, id, message) {
  console.log('creating message', message);
  const _booking = id;
  const _sender = userId;
  const body = message;




  Booking.findOne({_id: ObjectId(_booking)}, function(err, booking){
    booking.messages.push(message._id);
    booking.save((err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });
  });

  MESSAGE.save((err, msg) => {
    if (err) {
      console.log(err);
      return err;
    }
    return msg;
  });
}
