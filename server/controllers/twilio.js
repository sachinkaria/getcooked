// Twilio Credentials
const config = require('../config/main');
const accountSid = config.twilio_account_sid;
const authToken = config.twilio_token;

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

function sendSMS(number, message) {
  console.log('Sending twilio SMS');
  client.messages.create(
    {
      to: number,
      from: process.env.TWILIO_NUMBER,
      body: message,
    },
    (err, msg) => {
      if (err) {
        console.log(err);
      } else {
        console.log(msg.sid);
      }
    }
  );
}

module.exports.sendSMS = sendSMS;