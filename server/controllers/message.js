const _ = require('lodash');
const config = require('../config');
const Message = require('../models/message');
const Booking = require('../models/booking');
const ObjectId = require('mongodb').ObjectId;
const Mailer = require('../services/mailer');
const utils = require('./utils');
const newMessageTemplate = require('../services/emailTemplates/newMessageTemplate');


module.exports.create = create;
module.exports.attachment = create;

function create(req, res) {
  let MESSAGE;
  const _booking = req.params.id;
  const _sender = req.user._id;
  const body = req.body.message;

  if (req.body.message.attachment) {
    console.log('creating pdf attachment');
    utils.pdfUploader({
      data_uri: body.data_uri,
      filename: body.filename,
      filetype: body.filetype,
      bookingId: _booking,
      userId: _sender
    }, (error, response) => {
      if (error) {
        return res.status(400).send({
          message: error.message
        });
      }
      MESSAGE = new Message({_sender, _booking, body: response, attachment: true});
      updateBooking();
    });
  } else {
    MESSAGE = new Message({_sender, _booking, body});
    updateBooking();
  }

  function updateBooking() {
    Booking.findOne({_id: ObjectId(_booking)})
      .populate('user', '_id firstName email')
      .populate('chef', '_id displayName companyEmail')
      .exec(function (err, foundBooking) {
        const NEW_MESSAGES = foundBooking.messages.concat([MESSAGE._id]);
        _.extend(foundBooking, {messages: NEW_MESSAGES});
        foundBooking.save((saveErr, booking) => {
          if (saveErr) {
            console.log(saveErr);
            return err;
          }
          MESSAGE.save((msgErr, msg) => {
            if (msgErr) {
              console.log(msgErr);
              return msgErr;
            }

            const SENDER_NAME = _.startCase(_.toLower(_sender.displayName || _.capitalize(_sender.firstName)));
            const RECIPIENT_NAME = _sender.toString() === booking.user._id.toString() ? _.startCase(_.toLower(booking.chef.displayName)) : _.capitalize(booking.user.firstName);

            if (booking.user) {
              const ENQUIRY_EMAIL_DATA = {
                subject: 'New Message',
                recipient: _sender.toString() === booking.user._id.toString() ? booking.chef.companyEmail : booking.user.email
              };

              sendMessageSlackNotification(SENDER_NAME, RECIPIENT_NAME);

              const HOSTNAME = getHostName();
              const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, newMessageTemplate(req.user, HOSTNAME));
              enquiryMailer.send();
            }

            return res.send(booking);

            function getHostName() {
              if (req.user.role === 'chef') {
                return 'http://'.concat(req.headers.host).concat('/dashboard/events');
              } else {
                return 'http://'.concat(req.headers.host).concat(`/dashboard/bookings/${booking._id}`);
              }
            }
          });
        });
      });
  }
}

function sendMessageSlackNotification(user, otherUser) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackBookingsWebHookUrl)
      .send({
        text: `${user} just sent a message to £${otherUser}.`
      })
      .end();
  }
}
