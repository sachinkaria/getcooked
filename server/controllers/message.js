'use strict';

const Message = require('../models/message');
const Conversation = require('../models/conversation');
const ObjectId = require('mongodb').ObjectId;

module.exports.create = create;

function create (req, res) {
  console.log('creating message', req.body);
  let _conversation = req.params.id;
  let _sender = req.user._id;
  let body = req.body.body;


  let message = new Message({_conversation: _conversation, _sender: _sender, body: body});

  Conversation.findOne({_id: ObjectId(_conversation)}, function(err, conversation){
    conversation.messages ? conversation.messages.push(message._id) : conversation.messages = [message._id];
    conversation.save((err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  message.save((err, message) => {
    if (err) console.log(err);
    res.jsonp(message)
  });
}
