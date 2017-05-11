'use strict';

const Message = require('../models/message');
const Conversation = require('../models/conversation');
const ObjectId = require('mongodb').ObjectId;


module.exports.sendMessage = create;

function create (req, res) {
    console.log(req.user);
    let _conversation = req.params.id;
    let _sender = req.user._id;

    let message = new Message({_conversation: _conversation, _sender: _sender});
    message.save((err) => {
        if (err) return (err);
    });

    Conversation.find({_id: ObjectId(_conversation)}).exec(function(err, conversation){
            conversation.messages ? conversation.messages.push(message) : conversation.messages = [message];
            res.jsonp(conversation);
    });
}