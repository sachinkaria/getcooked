'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = require('./booking');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const moment = require('moment');


const UserSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    phoneCode: {
      name: String,
      dialCode: Number,
      code: String
    },
    mobileNumber: {
      type: String,
      trim: true,
      default: ''
    },
    role: {
      type: String,
      enum: ['member', 'chef', 'admin'],
      default: 'member'
    },
    status: {
      type: String,
      enum: ['pending', 'listed', 'unlisted'],
      default: 'pending'
    },
    profilePhoto: {
      type: String
    },
    coverPhoto: {
      type: String
    },
    photos: [{
      src: {
        type: String
      }
    }],
    companyEmail: {
      type: String
    },
    companyWebsite: {
      type: String
    },
    companyPhoneNumber: {
      type: String
    },
    displayName: {
      type: String
    },
    tagLine: {
      type: String
    },
    description: {
      type: String
    },
    serviceType: [{
      type: String
    }],
    services: [{
      type: String
    }],
    events: [{
      type: String
    }],
    cuisines: [{
      type: String
    }],
    additionalServices: [{
      type: String
    }],
    stripe: {
      customerId: String,
      sourceId: String,
      sourceClientSecret: String
    },
    subscription: {
      id: String,
      status: {
        type: String,
        enum: ['pending', 'active', 'cancelled'],
        default: 'pending'
      },
      plan: String,
      discount: String,
      currency: String
    },
    minimumTotalBudget: Number,
    minimumPerHeadBudget: Number,
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
  },
  {
    timestamps: true,
    toObject: { virtuals: true, getters: true },
    toJSON: { virtuals: true, getters: true }
  });

UserSchema.methods.findAcceptedBookings = function (cb) {
  const DATE_START = moment().startOf('month');
  return Booking
    .find({ $or: [{ user: this.id }, { chef: this.id }], updatedAt: { $gte: DATE_START } })
    .lean()
    .exec(cb);
};

UserSchema.virtual('contactNumber').get(function () {
  if (this.phoneCode.dialCode && this.mobileNumber) {
    return '+'.concat(this.phoneCode.dialCode.toString() + parseInt(this.mobileNumber, 10).toString());
  }
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Compare password for login
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.matchPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      cb(err);
    }
    cb(isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);