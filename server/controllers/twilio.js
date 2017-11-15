// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;

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