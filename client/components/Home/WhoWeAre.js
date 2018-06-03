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
                Get Cooked give you the opportunity to share food with professional caterers at events organised by you.
                Compare and book the best <span className="gc-bold">professional, sustainable and bespoke caterers</span> around. Book caterers for your <span className="gc-bold">
                weddings, parties, corporate events, private dinners</span> and more.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeAre;

