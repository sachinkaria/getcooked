'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ConversationSchema = new Schema({
        _sender: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        _recipient: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        messages: [{ type: Schema.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);