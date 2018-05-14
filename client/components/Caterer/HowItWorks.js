import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListItem from '../chefs/ListItem';

function HowItWorks() {
  return (
    <section className="gc-section text-center">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading">
            How it works
          </h3>
          <br />
          <Row>
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/chef.svg" />
              <h4 className="gc-profile-text-md gc-bold">
                Create a profile.
              </h4>
              <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                Profiles include information, pictures, sample menus, ratings and reviews.
              </p>
            </Col>
            <br className="visible-xs" />
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png" />
              <h4 className="gc-profile-text-md gc-bold">
                Receive bookings.
              </h4>
              <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                Receive and review online bookings to cater events around London.
              </p>
            </Col>
            <br className="visible-xs" />
            <Col sm={4}>
              <img className="gc-info-icon" alt="Share and enjoy food" src="/images/food.png" />
              <h4 className="gc-profile-text-md gc-bold">
                Cater events.
              </h4>
              <p className="gc-text gc-text--lg">
                Cater events around you. Share your food at dinners, weddings, parties and more.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default HowItWorks;

