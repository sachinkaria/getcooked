import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StepsColumn from '../StepsColumn';

function GetQuote() {
  return (
    <section className="gc-section center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h2 className="gc-section-heading gc-center">Get Quotes</h2>
          <br />
          <Row>
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/search.png"
              heading="Search"
              text="Our collection of profiles make it easy to find the perfect caterer for your event.
"
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/phone.png"
              heading="Contact"
              text="Check the caterers availability by directly contacting them with your event details."
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/ingredients.png"
              heading="Feast"
              text="Share and enjoy food at events organised by anytime, anywhere."
            />
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default GetQuote;

