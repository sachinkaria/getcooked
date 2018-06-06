import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StepsColumn from '../StepsColumn';

function WhoWeWorkWith() {
  return (
    <section className="gc-section gc-section--grey center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <StepsColumn
              columnWidth={3}
              imageSrc="/images/icon-chefhat.png"
              heading="Professional"
              size="small"
              text="Professional companies ensuring amazing food and service."
            />
            <StepsColumn
              columnWidth={3}
              imageSrc="/images/icon-hands.png"
              heading="Bespoke"
              size="small"
              text="Flexible service alongside personal and tailored menus."
            />
            <StepsColumn
              columnWidth={3}
              imageSrc="/images/icon-organic.png"
              heading="Sustainable"
              size="small"
              text="Sourced locally and largely organic keeping your events sustainable."
            />
            <StepsColumn
              columnWidth={3}
              imageSrc="/images/icon-healthy.png"
              heading="Healthy"
              size="small"
              text="Using fresh and organic ingredients to serve healthy menus."
            />
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeWorkWith;

