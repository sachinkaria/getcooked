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
      from: '+441244470582',
      body: message,
    },
    (err, msg) => {
      if (err) console.log(err);
      console.log(msg.sid);
    }
  );
}

module.exports.sendSMS = sendSMS;