import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function AreYouACaterer() {
  return (
    <section className="gc-section gc-section--grey">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <Col sm={6}>
              <img
                style={{ width: '100%', paddingTop: '15px' }}
                alt="Cater events around you"
                src="/images/catering.jpg"
              />
            </Col>
            <Col sm={6}>
              <h3 className="gc-section-heading gc-padding-none">
                Are you a caterer or private chef?
              </h3>
              <p className="gc-text gc-text--lg">
                Plan, organise and share food at events around London.
                Connect and share your food with event organisers. Receive bookings directly
                through our platform and cater events around you.
              </p>
              <Row>
                <Col sm={8}>
                  <Link to="/caterers/about">
                    <Button block className="gc-btn gc-btn--orange gc-margin-top--lg">
                      Find out more
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default AreYouACaterer;

