const moment = require('moment');
const _ = require('lodash');

module.exports = (chef, user, booking, hostname) => {
  return `
    <html>
<header style="max-width:600px;margin:auto;">
    <a href="https://www.getcooked.co" title="Get Cooked"><span style="background-image: url('https://www.getcooked.co/images/logo-icon.png');background-repeat:no-repeat;background-size:60px;background-position:center;display:block;height:60px;width:60px;margin:auto;"></span></a>
<a href="https://www.getcooked.co" title="Get Cooked" style="text-decoration:none;display:block;margin:auto; text-align: center; margin-bottom:25px;font-family:Verdana, Geneva, sans-serif;font-size: 24px; font-weight: 00; color:#f05125;">Get Cooked</a>
</header>

<section style="max-width:600px;margin:auto;padding:20px;border-bottom: 1px solid #ffc9ba;border-top: 1px solid #ffc9ba; font-family:Verdana, Geneva, sans-serif; font-size:14px;color: #5e5e5e;" >
    <article>
        <p style="font-size: 20px;"><a href="${hostname}" title="${_.startCase(_.toLower(chef.displayName))}" style="text-decoration:none; color:#f05125">${_.startCase(_.toLower(chef.displayName))}</a> is interested in catering your ${booking.eventType} on ${moment(booking.date).format('Do MMM YYYY')}.</p>
        <p>
          You can check out their Get Cooked profile <a href="${hostname}" title="${_.startCase(_.toLower(chef.displayName))}" style="text-decoration:none; color:#f05125">here</a>. They will be in touch shortly via the contact details you provided to get some more information on your event.
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
                    padding: 5px;
                    border-radius: 25px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 20px;
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIzQTEwQTFFMzg0NTExRTRCN0UzQzA5NDFBNkFERjNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDRkY4RkVBMzg1MDExRTRCN0UzQzA5NDFBNkFERjNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjNBMTBBMUMzODQ1MTFFNEI3RTNDMDk0MUE2QURGM0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjNBMTBBMUQzODQ1MTFFNEI3RTNDMDk0MUE2QURGM0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5IX9o6AAABRElEQVR42mL8//8/w2AGTAyDHIw6cNSBJABWIM4C4q1AfBuI3wPxJzQ8jVRDWajkOH0g3gTEcgTUiQyEA7mB+DgQcxKh9stARHExkY4DAZ6BCMFgAvJfgfgflP1mIByIK909BuJIIL4GxH+gYr/p7UAWPNE7F4iPDnQxwwjEuCrzX4OhHPyNlL7QwV9qOJCcKOaAFsqwwpkRhzpBIOZFE/tPalHDSEZzC1QbxCDxeXGo+4klmmcCcSmtQ1AEj6OQATsUI4NP9EiDXyhIUlfp4UAuChz4mB6Z5AtaDmXGoe4/Wg7/DMSPSC7HyMgkgkihCPLgDWjORgd9UIxcLr6mRwi+h2IYwFUOPgfipwNdUOMrB3kYqABG+ySjDhx14KgDRx046sCBdyAnDZplVO0Xv8LhyPfUcCDj6BDwqANHHYgfAAQYADMYPzPKc8bdAAAAAElFTkSuQmCC');
                    background-color: #3b5998;">
                </div>
            </a>
        </li>
        <li style="display: table-cell; width: 33.33%;">
            <a href="https://www.instagram.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    padding: 5px;
                    border-radius: 25px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 20px;
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAA7VBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9sDJFPAAAATnRSTlMABgcKCw0YGRwdKS4vMDEyMzU2OTo7Q0RLTE1ZXGBhYmNkZWZnbnx9f4SHiIyNjo+hoqmqq7bBwtrd3t/j5OXp7O3u8PHz9PX29/j5+v3MZrRrAAAAAWJLR0ROGWFx3wAAAdpJREFUSMftlVtb2kAQhoc2DVZDXRQPWFuVFE+VqIgnEMWowGrz/v+f0wuyJGuSx/LUS+cq+Z55YXZ25ovIR8wYXxsnl1c3YRg+ADyEYXhzdXnSmCtIn29H5EbUns/L/z6iMPTPbP4mwKCzt7W+VlNKLS0ppWpr61t7nQHAZqaeMehmKe+vS00N49dVnYGuFTWjpuHMluYiaOYm++cHn6QJkd2rBgxy69kADqQ0gIaln0In/V72vLKIiOwD5yIdOLWAC9hNsoMeQC8oi6g/4IvswoUFXMO2ef41NO0f+iKL+3UR2YZrC7iFevz4O31jh7FYh1sLuIPV+PeBcUs5jgo04E/UVbizgHtYmdQ/hP7CRPT6MHRFRGQF7i3gEZZFRCQAvWBUT0NLRESW4dECRgbomRSDdw0wsoCXGCgDKpGrgBsDLxYQxWf4BnxOZAeoxGeIcoEK4CTyF8DLBWYuKX3oIJGPCw89bWsLtGfUioaj/LbaFxcTlT48FVxcMho+oIOq41SPn5luQWY0UsN3+E/Dlx5vfzreTztGy4y3tUBuqwvQPXKnUmaBXq+o63lu+j2zooUmEFtTxgSKbUZEJMdmpP2WkbX/1ypnNuM37P7He3xQZv9kfURh/AXqe6HnZSoMawAAAABJRU5ErkJggg==');
                    background-color: #d93175;">
                </div>
            </a>
        </li>
        <li style="display: table-cell; width: 33.33%;">
            <a href="https://www.twitter.com/getcookedapp">
                <div style="
                    height: 30px;
                    width: 30px;
                    padding: 5px;
                    border-radius: 25px;
                    display: inline-block;
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: 20px;
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDRkY4RkVEMzg1MDExRTRCN0UzQzA5NDFBNkFERjNCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDRkY4RkVFMzg1MDExRTRCN0UzQzA5NDFBNkFERjNCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNGRjhGRUIzODUwMTFFNEI3RTNDMDk0MUE2QURGM0IiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNGRjhGRUMzODUwMTFFNEI3RTNDMDk0MUE2QURGM0IiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zK10AAAACZElEQVR42uyYT0hUQRzH3WUhSiQr8pJGWAqVQhKYWKFER6kIL1qX2HuHPVpQ0SW8desQdIgiCCmiS0WXojqYRH8vJv4JlFrIylCDdl+fgSnG4f2Zmee+7fB+8GEf83bmfd9v5veb37yM53k1/7NlUoGpwCpbNoFn9MMdmIIfMAP3YCCkz95/V8KDGp0+bS40wlMv3EahRenTBx/g6t82fdC1suO1mOKaoOiZ2TzchAmlLRsk8Ljyp3MxBL713Owl5NSx9DXYoVyfhysOa+4EtDn0K8J1OCPXqe8aHA54q90W3nvh6L1lv9nTBz8dMsAlWBchLmex9oLslDqm/oAdEZ1n4SI0BwishaUY4o7oY/ol6kdw2GDNiFz2EMbgPSzI9mnY6pgz6+F71E5SCz8tB/4GH2EO9sNGR4GtML6iRXPpHvkrgmIcyl5yVoIGfYr1NFOAeRiUW1OSG/VnmWpqwjx40quePfYLPN2Dd+F3lQqX5ybVjAiOoSoJvG9TDz6D7gTFfYVNNvXgQTndSdkt14q6B/JwDOoqKFAk9k9+N3IhlfYFWIalCgfO7SBxYQLLsjwfTmB6C6F3I6qTkQrnvqGo8s3kVCeC5WgFPDcKnZH/MixCC9qZIa4tQL3Js23PGttk4forhjhRgLSZPtP2XNwA+0KCK8oW5bS+M+5h8BbrIS/PJnHsDWy3PSGqQdIrvSO2nQw0wy44ABtiBsRlmU7K1j0Vte3yAL2a9gB64nwE8GvcDGfhtaOoL3ADelfjE0pUHmyHQ9AFO2ELrFHul2QlPAmv4IlkMf0+mApMBSZkfwQYAIsHGpyIukJuAAAAAElFTkSuQmCC');
                    background-color: #55acee;">
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