import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StepsColumn from '../StepsColumn';

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
              <h2 className="gc-section-heading gc-padding-none">Who we are</h2>
              <p className="gc-text gc-text--lg">
                Get Cooked is a platform to provide professional chefs and culinary experts
                the opportunity to share their awesome food at unique events around them.
                To give professionals, brands, food lovers a space to connect, share ideas
                and work together.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeAre;

