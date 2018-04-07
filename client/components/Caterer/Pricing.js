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
              <Panel className="gc-panel gc-panel--translucent">
                <Panel.Body>
                  <h3 className="gc-heading gc-margin-none">
                    £20
                    <span className="gc-profile-text-lg gc-margin-none"> per month</span>
                  </h3>
                  <h4 className="gc-profile-text-md gc-profile-text-md gc-bold">
                    Only for months where you receive bookings.
                  </h4>
                  <br />
                  <Row>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">No additional fees.</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        No commissions or any other additional fees. One monthly fee.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">No contracts.</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        No obligations, contracts or online payments. Plam your event directly with your event host.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <h4 className="gc-profile-text-md gc-bold">Cancel at any time.</h4>
                      <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                        Cancel or pause your subscription at any time. Month by month subscriptions.
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
