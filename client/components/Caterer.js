import React from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

function Caterer() {
  const priceSectionStyle = {
    backgroundImage: 'url(/images/catering-2.jpg)',
    backgroundSize: 'cover'
  };
  return (
    <div>
      <section className="gc-section gc-section--main gc-section--grey">
        <Row>
          <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
            <Row>
              <Col sm={10}>
                <h1 className="gc-title">
                  Grow your catering business.
                </h1>
                <h2 className="gc-heading">
                  Receive online bookings and cater events around you.
                </h2>
              </Col>
            </Row>
            <section className="gc-section center-m">
              <Row>
                <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                  <Row>
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/chef.svg" />
                      <h4 className="gc-profile-text-md gc-bold">
                        Create a profile.
                      </h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        Profiles include information, pictures, sample menus, ratings and reviews.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png" />
                      <h4 className="gc-profile-text-md gc-bold">
                        Receive bookings.
                      </h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        Receive and review online bookings to cater events around London.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/food.png" />
                      <h4 className="gc-profile-text-md gc-bold">
                        Cater events.
                      </h4>
                      <p className="gc-text gc-text--lg">
                        Cater events around you. Share your food at dinners, weddings, parties and more.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
            <Row>
              <Col sm={4} smOffset={4}>
                <Link to="/caterers/register">
                  <Button
                    onClick={() => heap.track('Click Sign Up', { role: 'caterer' })}
                    block
                    className="gc-btn gc-btn--lg gc-btn--orange"
                  >
                    Get started for free
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="gc-section" style={priceSectionStyle}>
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            <h2 className="gc-section-heading gc-white">
              ONE PRICE, NO ADDITIONAL FEES.
            </h2>
            <br />
            <Row>
              <Col xs={12}>
                <Panel className="gc-panel gc-panel--translucent text-center">
                  <Panel.Body className="gc-panel">
                    <Row>
                      <Col xs={12}>
                        <hr className="gc-hr--xl" />
                        <h3 className="gc-heading gc-padding-small gc-margin-none">
                          <span className="gc-profile-text-lg">Just</span> £20<span className="gc-profile-text-lg"> per month</span>
                        </h3>
                        <p className="gc-profile-text-md gc-bold gc-margin-top">No additional fees. No contracts. Cancel your subscription at any time.</p>
                        <Row>
                          <Col xs={12} sm={8} smOffset={2}>
                            <Panel className="gc-panel gc-panel--bold gc-margin-top">
                              <Panel.Body>
                                <p className="gc-text gc-text--lg gc-bold gc-margin-none">
                                  Your subscription only starts after you receive your first booking and you will only be charged for months that you have received bookings.
                                </p>
                              </Panel.Body>
                            </Panel>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm={4}>
                        <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png" />
                        <p className="gc-profile-text-md gc-bold">
                          Online Bookings
                        </p>
                        <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                          Email and SMS alerts make it easy to receive and view booking requests on any device.
                        </p>
                      </Col>
                      <br className="visible-xs" />
                      <Col sm={4}>
                        <img className="gc-info-icon" alt="Share and enjoy food" src="/images/review.png" />
                        <p className="gc-profile-text-md gc-bold">
                          Ratings & Reviews
                        </p>
                        <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                          Build trust with your hosts by receiving ratings and reviews from your happy customers.
                        </p>
                      </Col>
                      <br className="visible-xs" />
                      <Col sm={4}>
                        <img className="gc-info-icon" alt="Share and enjoy food" src="/images/phone.png" />
                        <p className="gc-profile-text-md gc-bold">
                          Direct Contact
                        </p>
                        <p className="gc-text gc-text--lg">
                          Customer contact details let you speak to them directly and provide a personalised experience.
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4} smOffset={4}>
                        <Link to="/caterers/register">
                          <Button
                            onClick={() => heap.track('Click Sign Up', { role: 'caterer' })}
                            block
                            className="gc-btn gc-btn--lg gc-btn--orange gc-margin-top--lg"
                          >
                            Get started for free
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
      <section className="gc-section">
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            <Panel className="gc-panel gc-panel--alert">
              <Panel.Body>
                <h2 className="gc-section-heading gc-center">
                  FAQs and Contact Us
                </h2>
                <p className="gc-text gc-text--lg gc-center">
                  If you are still unsure about our services please feel free to drop us an <a className="gc-link-default" href="mailto:team@getcooked.co?Subject=Website%20Enquiry" target="_top">team@getcooked.co</a>. Alternatively you can
                  ask us any questions via chat or check out our <a className="gc-link-default" rel="noopener noreferrer" target="_blank" href="https://intercom.help/get-cooked/faqs-caterers">FAQs</a>.
                </p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default Caterer;