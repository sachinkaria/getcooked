import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListItem from '../chefs/ListItem';

function Features() {
  return (
    <section className="gc-section text-center">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading">
            Features
          </h3>
          <br />
          <Row>
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png" />
              <h4 className="gc-profile-text-md gc-bold">
                Online Bookings
              </h4>
              <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                Email and SMS alerts make it easy to receive and view booking requests.
              </p>
            </Col>
            <br className="visible-xs" />
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/phone.png" />
              <h4 className="gc-profile-text-md gc-bold">
                Direct Contact
              </h4>
              <p className="gc-text gc-text--lg">
                Contact the customer directly and provide a personalised experience.
              </p>
            </Col>
            <br className="visible-xs" />
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/review.png" />
              <h4 className="gc-profile-text-md gc-bold">
                Ratings & Reviews
              </h4>
              <p className="gc-text gc-text--lg">
                Build trust by receiving ratings and reviews from your happy customers.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Features;

