const moment = require('moment');

module.exports = (chef, user, booking, hostname) => {
  return `
    <html>
<header style="max-width:600px;margin:auto;">
    <a href="https://www.getcooked.co" title="Get Cooked"><span style="background-image: url('https://www.getcooked.co/images/logo-icon.png');background-repeat:no-repeat;background-size:60px;background-position:center;display:block;height:60px;width:60px;margin:auto;"></span></a>
<a href="https://www.getcooked.co" title="Get Cooked" style="text-decoration:none;display:block;margin:auto; text-align: center; margin-bottom:25px;font-family:Verdana, Geneva, sans-serif;font-size: 24px; font-weight: 00; color:#f05125;">Get Cooked</a>
</header>

<section style="max-width:600px;margin:auto;padding:20px;border-bottom: 1px solid #ffc9ba;border-top: 1px solid #ffc9ba; font-family:Verdana, Geneva, sans-serif; font-size:14px;color: #5e5e5e;" >
    <article>
        <p style="font-size: 20px;">You have received a booking request!</p>
<p style="font-size: 16px;">Event details</p>

<div style="border-radius: 6px; background-color: #efefef; padding: 10px; width: 350px;">
        <ul style="list-style-type: none;margin-left: 0; padding: 0;">
          <li>
            <p style="margin: 0; padding: 0;">Date</p>
            <p style="font-style: italic; margin: 0; padding: 0; margin-bottom: 10px;">${moment(booking.date).format('Do MMM YY')}</p>
          </li>
          <li>
            <p style="margin: 0; padding: 0;">Number of guests</p>
            <p style="font-style: italic; margin: 0; padding: 0; margin-bottom: 10px;">${booking.numberOfPeople}</p>
          </li>
          <li>
            <p style="margin: 0; padding: 0;">Budget</p>
            <p style="font-style: italic; margin: 0; padding: 0; margin-bottom: 10px;">£${booking.budget}</p>
          </li>
          <li>
            <p style="margin: 0; padding: 0;">Location</p>
            <p style="font-style: italic; margin: 0; padding: 0;">${booking.address.line1}, ${booking.address.postcode}</p>
          </li>
        </ul>
</div>
        <p style="color: #5e5e5e;">
          You can access your bookings for more information and confirm your availability via your dashboard <a href="${hostname}" title="Get Cooked dashboard" style="text-decoration:none; color:#f05125">here</a>. Once you confirm your availability you will receive the contact details for the client.
        </p>
    </article>
</section>

<footer style="max-width:600px;margin:auto;padding:20px;text-align:center;font-size: 12px;">
    <ul style="display:table; margin: 0 auto; list-style:none; width: 200px; text-align: center;padding:0;">
<li style="display: table-cell; width: 33.33%;">
            <a href="https://www.facebook.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    display: inline-block;
                    background-image: url('https://www.getcooked.co/images/icon-facebook.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 30px;"
                </div>
            </a>
        </li>
        <li style="display: table-cell; width: 33.33%;">
            <a href="https://www.instagram.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    display: inline-block;
                    background-image: url('https://www.getcooked.co/images/icon-instagram.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 30px;"
                </div>
            </a>
        </li>
        <li style="display: table-cell; width: 33.33%;">
            <a href="https://www.twitter.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    display: inline-block;
                    background-image: url('https://www.getcooked.co/images/icon-twitter.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 30px;"
                    >
                </div>
            </a>
        </li>
    </ul>
    <div style="margin-top: 20px; text-align: center;font-family:Verdana, Geneva, sans-serif; color: #5e5e5e;">
        Get Cooked Ltd
        <br>
        5, 61 Tanner Street, 
        <br>
        London, United Kingdom,
        <br>
        SE13PP
        <br>
        © Get Cooked 2018. All rights reserved
    </div>
</footer>
    </html>
`;
};