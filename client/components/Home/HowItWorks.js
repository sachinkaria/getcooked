import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StepsColumn from '../StepsColumn';

function HowItWorks() {
  return (
    <section className="gc-section gc-section--grey center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading gc-center">How it works</h3>
          <br />
          <Row>
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/phone.png"
              heading="Contact"
              text="Our collection of profiles makes it easy to find the perfect caterer for your event.
"
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/checklist.png"
              heading="Plan"
              text="Plan your event directly with your caterer and enjoy a personlised experience."
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/ingredients.png"
              heading="Feast"
              text="Share and enjoy food at events organised by you anytime, anywhere."
            />
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default HowItWorks;

