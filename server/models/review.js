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
  overall: Number,
  food: Number,
  service: Number,
  value: Number,
  hygiene: Number,
  comment: String
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Review', ReviewSchema);
