'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ConversationSchema = new Schema({
        sender: {
            type: Schema.ObjectId,
            ref: 'User',
            es_indexed: true
        },
        recipient: {
            type: Schema.ObjectId,
            ref: 'User',
            es_indexed: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        },
        messages: {
            type: Array,
            default: []
        }
});

module.exports = mongoose.model('Conversation', ConversationSchema);