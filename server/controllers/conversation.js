'use strict';

const Conversation = require('../models/conversation');
const Message = require('../models/message');

module.exports.create = create;
module.exports.list = list;
module.exports.get = get;

function list(req, res) {
    let user = req.user;
    Conversation
        .find( { $or: [ { _sender: user._id }, { _recipient: user._id } ] } )
        .populate('_recipient', '_id firstName displayName profilePhoto')
        .populate('_sender', '_id firstName displayName profilePhoto')
        .populate('messages', 'body')
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

function get (req, res, next) {
    let id = req.params.id;
    Message.find({ _conversation: id })
        .sort('-date')
        .populate('_sender', '_id firstName displayName profilePhoto')
        .exec((err, messages) => {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            return res.jsonp(messages);
        });
}