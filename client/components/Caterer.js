import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function Caterer() {
  return (
    <div>
      <section className="gc-section gc-section--main gc-section--grey">
        <Row>
          <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
            <Row>
              <Col sm={10}>
                <h1 className="gc-title">
                  Become a caterer.
                </h1>
                <h2 className="gc-heading">
                  Plan, organise and share your food at events around you.
                </h2>
              </Col>
            </Row>
            <section className="gc-section center-m">
              <Row>
                <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                  <Row>
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/chef.svg" />
                      <h4 className="gc-profile-text-md gc-bold">
                        Create a profile.
                      </h4>
                      <p className="gc-text gc-margin-bottom--lg">
                        Profiles include information, pictures, sample menus, ratings and reviews.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png"/>
                      <h4 className="gc-profile-text-md gc-bold">
                        Receive bookings.
                      </h4>
                      <p className="gc-text gc-margin-bottom--lg">
                        Receive and review online bookings to cater events around London.
                      </p>
                    </Col>
                    <br className="visible-xs" />
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/food.png"/>
                      <h4 className="gc-profile-text-md gc-bold">
                        Cater events.
                      </h4>
                      <p className="gc-text">
                        Cater your event. Share your food at dinners, weddings, parties and more.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
            <Row>
              <Col sm={4} smOffset={4}>
                <Link to="/caterers/register">
                  <Button block className="gc-btn gc-btn--orange">
                    Get started
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  )
};
