const Event = require('../models/event');
const request = require('superagent');
const config = require('../config/main');

module.exports.create = create;

function create(req, res) {
  const EVENT = req.body;
  const USER = EVENT.contactDetails;

  const event = new Event({
    eventType: EVENT.eventType,
    date: EVENT.date,
    numberOfPeople: EVENT.numberOfPeople,
    additionalInformation: EVENT.additionalInformation || null,
    address: {
      line1: EVENT.address_line1,
      line2: EVENT.address_line2,
      city: EVENT.city,
      postcode: EVENT.postcode,
    },
    budget: EVENT.budget,
    services: EVENT.services,
    foodServices: EVENT.foodServices,
    contactDetails: EVENT.contactDetails
  });

  event.save((bookingErr) => {
    if (bookingErr) {
      console.log(bookingErr);
      return (bookingErr);
    }
    sendNewBookingSlackNotification(USER);
    return res.jsonp(event);
  });
}

function sendNewBookingSlackNotification(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackEventsWebHookUrl)
      .send({
        text: `${user.firstName} (${user.email}) just created a new event.`
      })
      .end();
  }
}
