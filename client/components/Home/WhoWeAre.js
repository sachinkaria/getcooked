import React from 'react';
import { Row, Col } from 'react-bootstrap';

function WhoWeAre() {
  return (
    <section className="gc-section">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <Col sm={6} smPush={6}>
              <img
                style={{ width: '100%', paddingTop: '15px' }}
                alt="Cater events around you"
                src="/images/dinner.webp"
              />
            </Col>
            <Col sm={6} smPull={6}>
              <h3 className="gc-section-heading gc-padding-none">Who we are</h3>
              <p className="gc-text gc-text--lg">
                Get Cooked gives you the opportunity to book caterers and private chefs for events
                organised by you. Compare and book the best professional, sustainable and bespoke companies and
                chefs in the business. Design the perfect menu for your weddings, parties, corporate events, private dinners
                and more. Our end-to-end booking system includes online messaging and payments making it super simple
                to make a booking.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeAre;

