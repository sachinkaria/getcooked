//model/comments.js
'use strict';
//import dependency
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt-nodejs');
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
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
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['Member', 'Chef', 'Admin'],
            default: 'Member'
        },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date }
    },
    {
        timestamps: true
    });

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {
    const user = this,
        SALT_FACTOR = 5;

    console.log(user);
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return cb(err); }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);