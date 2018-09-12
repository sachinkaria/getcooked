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

const EventSchema = new Schema({
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
  services: [{
    type: String,
    required: true
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
  additionalInformation: String,
  status: {
    type: String,
    enum: ['pending', 'contacted', 'confirmed'],
    default: 'pending'
  },
  budget: Number,
  foodServices: [{
    type: String
  }],
  openToVegan: Boolean,
  openToVegetarian: Boolean,
  bookings: [{
    type: Schema.ObjectId,
    ref: 'Booking'
  }],
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Event', EventSchema);
