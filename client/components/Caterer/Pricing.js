import React from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

function Pricing() {
  const priceSectionStyle = {
    backgroundImage: 'url(/images/catering-2.jpg)',
    backgroundSize: 'cover'
  };
  return (
    <section className="gc-section center-m" style={priceSectionStyle}>
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <h2 className="gc-section-heading gc-white">
            ONE PRICE, NO ADDITIONAL FEES.
          </h2>
          <Row>
            <Col xs={12}>
              <Panel className="gc-panel gc-panel--translucent text-center">
                <Panel.Body>
                  <Row>
                    <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                      <Panel className="gc-panel gc-panel--alert">
                        <Panel.Body>
                          <h3 className="gc-heading gc-margin-none">
                            <span className="gc-profile-text-lg gc-margin-none">Just </span>
                            £20
                            <span className="gc-profile-text-lg gc-margin-none"> per month</span>
                          </h3>
                          <h4 className="gc-profile-text-md gc-profile-text-md gc-bold">
                            Only for months where you receive bookings
                          </h4>
                        </Panel.Body>
                      </Panel>
                    </Col>
                  </Row>
                  <br />
                  <Row className="gc-margin-bottom--lg">
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png" />
                      <p className="gc-profile-text-md gc-bold">
                        Online Bookings
                      </p>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        Email and SMS alerts make it easy to receive and view booking requests.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/phone.png" />
                      <p className="gc-profile-text-md gc-bold">
                        Direct Contact
                      </p>
                      <p className="gc-text gc-text--lg">
                        Contact the customer directly and provide a personalised experience.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/review.png" />
                      <p className="gc-profile-text-md gc-bold">
                        Ratings & Reviews
                      </p>
                      <p className="gc-text gc-text--lg">
                        Build trust by receiving ratings and reviews from your happy customers.
                      </p>
                    </Col>
                  </Row>
                  <p className="gc-profile-text-md gc-bold">No additional fees. No contracts. Cancel your subscription at any time.</p>
                  <Row>
                    <Col sm={4} smOffset={4}>
                      <Link to="/caterers/register">
                        <Button
                          onClick={() => heap.track('Click Sign Up', { role: 'caterer' })}
                          block
                          className="gc-btn gc-btn--lg gc-btn--orange gc-margin-top--sm"
                        >
                          Get started
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
  );
}

export default Pricing;

