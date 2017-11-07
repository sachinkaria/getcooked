'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = {
  address_line1: String,
  address_line2: String,
  address_city: String,
  address_country: String,
  address_postcode: String
};

const BookingSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  chef: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  address: AddressSchema,
  date: Date,
  numberOfPeople: Number,
  eventType: {
    type: String,
    enum: ['private dinner', 'corporate event', 'wedding', 'party', 'festival', 'other'],
    required: true
  },
  additionalInformation: String
});

module.exports = mongoose.model('Booking', BookingSchema);