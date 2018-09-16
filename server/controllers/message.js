const _ = require('lodash');
const Message = require('../models/message');
const Booking = require('../models/booking');
const ObjectId = require('mongodb').ObjectId;
const Mailer = require('../services/mailer');
const newMessageTemplate = require('../services/emailTemplates/newMessageTemplate');


module.exports.create = create;

function create(req, res) {
  const _booking = req.params.id;
  const _sender = req.user._id;
  const body = req.body.message;

  const MESSAGE = new Message({_sender, _booking, body});
  Booking.findOne({_id: ObjectId(_booking)})
    .populate('user', '_id firstName email')
    .populate('chef', '_id displayName companyEmail')
    .exec(function (err, foundBooking) {
      const NEW_MESSAGES = foundBooking.messages.concat([MESSAGE._id]);
      _.extend(foundBooking, { messages: NEW_MESSAGES });
      foundBooking.save((err, booking) => {
        if (err) {
          console.log(err);
          return err;
        }
        MESSAGE.save((err, msg) => {
          if (err) {
            console.log(err);
            return err;
          }


          const ENQUIRY_EMAIL_DATA = {
            subject: 'New Message',
            recipient: req.user._id.toString() === booking.user._id.toString() ? booking.chef.companyEmail : booking.user.email
          };

          const HOSTNAME = getHostName();
          const enquiryMailer = new Mailer(ENQUIRY_EMAIL_DATA, newMessageTemplate(req.user, HOSTNAME));
          enquiryMailer.send();

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
