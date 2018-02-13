import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Privacy() {
  return (
    <section className="gc-section gc-section--main gc-section--grey">
      <Row>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
          <Row>
            <Col sm={10}>
              <h1 className="gc-profile-heading-md text-center">Privacy policy</h1>

              <br />
              <h2 className="gc-profile-heading-sm">Key details</h2>

              <p>
                This website privacy policy describes how Get Cooked Ltd protects and makes use of the information you give the company when you use this website.
                If you are asked to provide information when using this website, it will only be used in the ways described in this privacy policy.
                This policy is updated from time to time. The latest version is published on this page.
              </p>

              <p>This website privacy policy was updated on:	12 February 2018</p>

              <p>If you have any questions about this policy, please email team@getcooked.co or write to: 18 Kamen House, 17-21 Magdalen Street, London, SE1 2RH.</p>

              <br />
              <h2 className="gc-profile-heading-sm">Introduction</h2>

              <p>
                We gather and use certain information about individuals in order to provide products and services and to enable certain functions on this website.
                We also collect information to better understand how visitors use this website and to present timely, relevant information to them.
              </p>

              <br />
              <h2 className="gc-profile-heading-sm">What data we gather</h2>

              <p>We may collect the following information:</p>

              <ul>
                <li>Name and job title</li>
                <li>Contact information including email address</li>
                <li>Demographic information, such as postcode, preferences and interests</li>
                <li>Website usage data</li>
                <li>Other information relevant to client enquiries</li>
                <li>Other information pertaining to special offers and surveys</li>
              </ul>

              <br />
              <h2 className="gc-profile-heading-sm">How we use this data</h2>

              <p>
                Collecting this data helps us understand what you are looking from the company, enabling us to deliver improved products and services.
              </p>

              <p>Specifically, we may use data:</p>
              <ul>
                <li>For our own internal records</li>
                <li>To improve the products and services we provide</li>
                <li>To contact you in response to a specific enquiry</li>
                <li>To customise the website for you</li>
                <li>To send you promotional emails about products, services, offers and other things we think might be relevant to you</li>
                <li>To contact you via email, telephone or mail for market research reasons</li>
                <li>To send you promotional mailings or to call you about products, services, offers and other things we think might be relevant to you</li>
              </ul>

              <br />
              <h2 className="gc-profile-heading-sm">
                Cookies and how we use them
              </h2>

              <h3 className="gc-text gc-bold">What is a cookie?</h3>

              <p>
              A cookie is a small file placed on your computer&#39;s hard drive. It enables our website to identify your computer as you view different pages on our website.
              Cookies allow websites and applications to store your preferences in order to present content, options or functions that are specific to you. They also enable us to see information like how many people use the website and what pages they tend to visit.
              </p>

              <h3 className="gc-text gc-bold">How we use cookies</h3>

              <p>
                We may use cookies to:
              </p>
              <ul>
                <li>Analyse our web traffic using an analytics package. Aggregated usage data helps us improve the website structure, design, content and functions</li>
                <li>Identify whether you are signed in to our website. A cookie allows us to check whether you are signed in to the site</li>
                <li>Test content on our website. For example, 50% of our users might see one piece of content, the other 50% a different piece of content</li>
                <li>Store information about your preferences. The website can then present you with information you will find more relevant and interesting</li>
                <li>To recognise when you return to our website. We may show your relevant content, or provide functionality you used previously</li>
              </ul>
             <p>Cookies do not provide us with access to your computer or any information about you, other than that which you choose to share with us.</p>

              <h3 className="gc-text gc-bold">Controlling cookies</h3>
              <p>
                You can use your web browser’s cookie settings to determine how our website uses cookies. If you do not want our website to store cookies on your computer or device, you should set your web browser to refuse cookies.
                However, please note that doing this may affect how our website functions. Some pages and services may become unavailable to you.
                Unless you have changed your browser to refuse cookies, our website will issue cookies when you visit it.
              </p>
              <p>To learn more about cookies and how they are used, visit All About Cookies.</p>

              <h3 className="gc-text gc-bold">Controlling information about you</h3>

              <p>
                When you fill in a form or provide your details on our website, you will see one or more tick boxes allowing you to:
              </p>

              <ul>
                <li>Opt-in to receive marketing communications from us by email, telephone, text message or post</li>
                <li>Opt-in to receive marketing communications from our third-party partners by email, telephone, text message or post</li>
              </ul>

              <p>If you have agreed that we can use your information for marketing purposes, you can change your mind easily, via one of these methods:</p>

              <ul>
                <li>Sign in to our website and change your opt-in settings</li>
                <li>Send an email to team@getcooked.co</li>
                <li>Write to us at: 18 Kamen House, 17-21 Magdalen Street, London, SE1 2RH</li>
              </ul>

              <p>
                We will never lease, distribute or sell your personal information to third parties unless we have your permission or the law requires us to.
                Any personal information we hold about you is stored and processed under our data protection policy, in line with the Data Protection Act 1998.
              </p>

              <br />
              <h2 className="gc-profile-heading-sm">Security</h2>

              <p>We will always hold your information securely.</p>
              <p>To prevent unauthorised disclosure or access to your information, we have implemented strong physical and electronic security safeguards.</p>
              <p>We also follow stringent procedures to ensure we work with all personal data in line with the Data Protection Act 1998.</p>

              <br />
              <h2 className="gc-profile-heading-sm">Links from our site</h2>

              <p>Our website may contain links to other websites.</p>
              <p>Please note that we have no control of websites outside the [domain name] domain. If you provide information to a website to which we link, we are not responsible for its protection and privacy.</p>
              <p>Always be wary when submitting data to websites. Read the site’s data protection and privacy policies fully.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Privacy;