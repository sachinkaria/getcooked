const moment = require('moment');

module.exports = (chef, user, booking, hostname) => {
  return `
    <html>
        <p>Hello ${chef.firstName},</p>
        <p>You have received a booking request!. The details are below:</p>
        <ul>
          <li>
            Name: ${user.firstName} ${user.lastName}
          </li>
          <li>
            Date: ${moment(booking.date).format('Do MMM YY')}
          </li>
          <li>
            Guests: ${booking.numberOfPeople}
          </li>
          <li>
            Budget: £${booking.budget}
          </li>
           <li>
            Location: ${booking.address.line1}, ${booking.address.postcode}
          </li>
        </ul>
        <p>
          You can access your bookings for more information and confirm your availability via your dashboard at: ${hostname}. Once you confirm
          your availability you will receive the contact details for the client.
        </p>
        <br>
        <p>Get Cooked</p>
    </html>
`;
};