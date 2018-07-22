const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = {
  line1: String,
  line2: String,
  city: String,
  country: String,
  postcode: String
};

const ContactSchema = {
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: {
    type: String,
    trim: true,
    default: ''
  },
  phoneCode: {
    name: String,
    dialCode: Number,
    code: String
  }
};

const BookingSchema = new Schema({
    chef: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    contactDetails: ContactSchema,
    address: AddressSchema,
    date: Date,
    numberOfPeople: Number,
    eventType: [{
      type: String,
      required: true
    }],
    additionalInformation: String,
    read: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    budget: Number,
    services: [{
      type: String
    }],
    foodStyle: [{
      type: String,
      required: true
    }],
    kitchenAvailable: Boolean,
    staffRequired: [{
      type: String,
      required: true
    }],
    additionalEquipment: [{
      type: String,
      required: true
    }],
    foodServices: [{
      type: String
    }],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
