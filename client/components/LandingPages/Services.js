import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';
import StepsColumn from  '../StepsColumn';

const Services = () => {
  return (
    <section className="gc-section">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/icon-chefhat.png"
              heading="Flexible and Tailored Menus"
              size="large"
              text="Design and discuss your menus with various catering options before committing to anything."
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/icon-organic.png"
              heading="Sustainable Sources and Companies"
              size="large"
              text="Our caterers often source seasonal ingredients farmed locally and sustainably reducing your carbon footprint."
            />
            <StepsColumn
              columnWidth={4}
              imageSrc="/images/icon-hands.png"
              heading="Simple and Easy Bookings"
              size="large"
              text="An end-to-end online booking system with messaging and payments make it super simple to book your caterer."
            />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
          <Link to={'/caterers'}>
            <Button block className="gc-btn gc-btn--orange gc-btn--lg gc-margin-top">
              Browse Caterers
            </Button>
          </Link>
        </Col>
      </Row>
    </section>
  );
  };

  export default Services;
/**
 * Created by sachinkaria on 09/10/2018.
 */
