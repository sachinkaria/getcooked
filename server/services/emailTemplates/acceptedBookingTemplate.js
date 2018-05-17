const moment = require('moment');
const _ = require('lodash');

module.exports = (chef, user, booking, hostname) => {
  return `
    <html>
        <p>Hi ${user.firstName},</p>
        <p>${_.capitalize(chef.displayName)} is interested in providing catering for your ${booking.eventType} on ${moment(booking.date).format('Do MMM YYYY')}!</p>
        <p>
          You can check out their profile on Get Cooked at ${hostname}. They will be in touch shortly via the contact details you provided to get some more information on your event.
        </p>
        <p>Regards,</p>
        <p>Get Cooked</p>
    </html>
`;
};