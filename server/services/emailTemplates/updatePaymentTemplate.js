module.exports = (chef, hostname) => {
  return `
    <html>
        <header style="max-width:600px;margin:auto;">
    <a href="https://www.getcooked.co" title="Get Cooked"><span style="background-image: url('https://www.getcooked.co/images/logo-icon.png');background-repeat:no-repeat;background-size:60px;background-position:center;display:block;height:60px;width:60px;margin:auto;"></span></a>
<a href="https://www.getcooked.co" title="Get Cooked" style="text-decoration:none;display:block;margin:auto; text-align: center; margin-bottom:25px;font-family:Verdana, Geneva, sans-serif;font-size: 24px; font-weight: 00; color:#f05125;">Get Cooked</a>
</header>

<section style="max-width:600px;margin:auto;padding:20px;border-bottom: 1px solid #ffc9ba;border-top: 1px solid #ffc9ba; font-family:Verdana, Geneva, sans-serif; font-size:14px;color: #5e5e5e;" >
    <article>
        <p style="text-align: center; font-size: 20px; color: #5e5e5e;">Your profile has been unlisted. Please update your payment details to continue receiving booking requests.</p>
        <p style="text-align: center; font-size: 20px; color: #5e5e5e;">You can update your details via your dashboard or click <a title="Get Cooked" href="${hostname}" style="text-decoration :none; color:#f05125;">here</a>.</p>
    </article>
</section>

<footer style="max-width:600px;margin:auto;padding:20px;text-align:center;font-size: 12px;">
<p style="font-family:Verdana, Geneva, sans-serif; font-size:14px;color: #5e5e5e;">Follow us</p>
    <ul style="display:table; margin: 0 auto; list-style:none; width: 200px; text-align: center;padding:0;">
<li style="display: table-cell; width: 33.33%;">
            <a href="https://www.facebook.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    display: inline-block;
                    background-image: url('https://getcooked-test.herokuapp.com/images/icon-facebook.png');
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
                    background-image: url('https://getcooked-test.herokuapp.com/images/icon-instagram.png');
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
                    background-image: url('https://getcooked-test.herokuapp.com/images/icon-twitter.png');
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
        18 Kamen House, 
        <br>
        17-21 Magdalen Street, 
        <br>
        London, United Kingdom,
        <br>
        SE12RH
        <br>
        © Get Cooked 2018. All rights reserved
    </div>
</footer>
    </html>
`;
};