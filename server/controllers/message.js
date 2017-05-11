'use strict';

const Message = require('../models/message');


module.exports.sendMessage = create;

function create (req, res) {
    let _conversation = req.params.id;
    let _sender = req.user._id;
    let body = req.body.body;


    let message = new Message({_conversation: _conversation, _sender: _sender, body: body});

    message.save((err, message) => {
        if (err) console.log(err);
        res.jsonp(message)
    });
}
