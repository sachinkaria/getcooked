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
    contactDetails: EVENT.contactDetails,
    kitchenAvailable: EVENT.kitchenAvailable,
    additionalEquipment: EVENT.additionalEquipment,
    foodStyle: EVENT.foodStyle,
    staffRequired: EVENT.staffRequired,
    startTime: EVENT.startTime,
    endTime: EVENT.endTime,
    openToVegan: EVENT.openToVegan,
    openToVegetarian: EVENT.openToVegetarian
  });

  event.save((bookingErr) => {
    if (bookingErr) {
      console.log(bookingErr);
      return (bookingErr);
    }
    sendNewBookingSlackNotification(USER, EVENT);
    return res.jsonp(event);
  });
}

function sendNewBookingSlackNotification(user, event) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(config.slackEventsWebHookUrl)
      .send({
        text: `${user.firstName} (${user.email}/${user.mobileNumber}) just created a new event with a budget of £${event.budget} for ${event.numberOfPeople} people.`
      })
      .end();
  }
}
