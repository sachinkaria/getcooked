'use strict';

const Conversation = require('../models/conversation');

module.exports.create = create;
module.exports.list = list;

function list(req, res) {
    let user = req.user;
    Conversation
        .find( { $or: [ { _sender: user._id }, { _recipient: user._id } ] } )
        .populate('_recipient', '_id firstName displayName profilePhoto')
        .populate('_sender', '_id firstName displayName profilePhoto')
        .exec((err, conversations) => {
        res.jsonp(conversations)
    });
}

function create (req, res) {
    let conversation = new Conversation(req.body);
    conversation.save((err) => {
        if (err) return (err);
        res.jsonp(conversation)
    });


}