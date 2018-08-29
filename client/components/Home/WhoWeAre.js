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
                src="/images/dinner.jpg"
              />
            </Col>
            <Col sm={6} smPull={6}>
              <h3 className="gc-section-heading gc-padding-none">Who we are</h3>
              <p className="gc-text gc-text--lg">
                Get Cooked gives you the opportunity to book professional caterers and private chefs for events organised by you.
                Compare and book the best professional, sustainable and bespoke caterering companies and chefs around. Cater your
                weddings, parties, corporate events, private dinners and more.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeAre;

