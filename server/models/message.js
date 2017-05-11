'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _conversation: {
        type: Schema.ObjectId,
        ref: 'Conversation',
        required: true
    },
    _sender: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'read'],
        default: 'sent',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    body: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', MessageSchema);