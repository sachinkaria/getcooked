'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = {
  line1: String,
  line2: String,
  city: String,
  country: String,
  postcode: String
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
    number_of_people: Number,
    event_type: {
      type: String,
      enum: ['private dinner', 'corporate event', 'wedding', 'party', 'festival', 'other'],
      required: true
    },
    additional_information: String,
    read: {
      type: Boolean,
      default: false
    },
    budget: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
