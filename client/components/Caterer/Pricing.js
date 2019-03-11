import React from 'react';
import { Row, Col, Button, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

function Pricing() {
  const priceSectionStyle = {
    backgroundImage: 'url(/images/catering-2.webp)',
    backgroundSize: 'cover'
  };
  return (
    <section className="gc-section text-center" style={priceSectionStyle}>
      <Row>
        <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading gc-white">
            ONE FEE, NO HASSLE.
          </h3>
          <Row>
            <Col xs={12}>
              <Panel className="gc-panel gc-panel--translucent">
                <Panel.Body>
                  <h3 className="gc-heading gc-margin-none">
                    5%
                    <span className="gc-profile-text-lg gc-margin-none"> per booking</span>
                  </h3>
                  <br />
                  <Row>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">No obligations</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        No obligations to fulfill enquiries. Flexible bookings to suit your needs.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">Easy communication</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                       Plan your event directly with your event host and save time and money.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">Cancel at any time</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        Quickly and easily cancel or pause your account at any time.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={4} smOffset={4}>
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

