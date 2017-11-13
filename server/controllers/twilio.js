// Twilio Credentials
const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

function sendSMS(number, message) {
  client.messages.create(
    {
      to: number,
      from: '+15017250604',
      body: message,
    },
    (err, msg) => {
      console.log(msg.sid);
    }
  );
}

module.exports.sendSMS = sendSMS;