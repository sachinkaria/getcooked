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

const QuoteSchema = {
  amount: String,
  depositAmount: String,
  status: String,
  balanceDue: String,
  datePaid: Date
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
    contactDetails: ContactSchema,
    address: AddressSchema,
    date: Date,
    startTime: Date,
    endTime: Date,
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
      enum: ['pending', 'accepted', 'declined', 'expired', 'deposit requested', 'confirmed'],
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
    openToVegan: Boolean,
    openToVegetarian: Boolean,
    messages: [{ type: Schema.ObjectId, ref: 'Message' }],
    quote: QuoteSchema,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', BookingSchema);
