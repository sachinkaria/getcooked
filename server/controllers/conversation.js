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
    let _sender = req.user._id;
    let _recipient = req.body._recipient;

    let conversation = new Conversation({_sender: _sender, _recipient: _recipient});
    conversation.save((err) => {
        if (err) return (err);
        res.jsonp(conversation)
    });
}