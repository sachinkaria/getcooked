'use strict';

const Conversation = require('../models/conversation');
const Message = require('../models/message');

module.exports.create = create;
module.exports.list = list;
module.exports.get = get;

function list(req, res) {
  const user = req.user;
  Conversation
    .find( { $or: [ { _sender: user._id }, { _recipient: user._id } ] } )
    .sort('-lastUpdated')
    .populate('_recipient', '_id firstName displayName profilePhoto')
    .populate('_sender', '_id firstName displayName profilePhoto')
    .populate('messages', '_sender body status')
    .exec((err, conversations) => {
      res.jsonp(conversations);
    });
}

function create (req, res) {
  const _sender = req.user._id;
  const _recipient = req.body._recipient;

  const conversation = new Conversation({_sender: _sender, _recipient: _recipient});
  conversation.save((err) => {
    if (err) return (err);
    res.jsonp(conversation)
  });
}

function get(req, res, next) {
  const user = req.user;
  const id = req.params.id;
  Message.find({ _conversation: id })
    .sort('date')
    .populate('_sender', '_id firstName displayName profilePhoto')
    .exec((err, messages) => {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      messages.forEach((message) => {
        parseInt(message._sender._id) != parseInt(user._id) && (message.status = 'read');
        message.save();
      });

      return res.jsonp(messages);
    });
}