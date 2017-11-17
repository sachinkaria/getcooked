'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  chef: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  Overall: Number,
  Food: Number,
  Service: Number,
  Value: Number,
  Hygiene: Number,
  additional_information: String
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Review', ReviewSchema);
