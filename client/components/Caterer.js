import React from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

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
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/chef.svg"/>
                      <h4 className="gc-profile-text-md gc-bold">
                        Create a profile.
                      </h4>
                      <p className="gc-text gc-margin-bottom--lg">
                        Profiles include information, pictures, sample menus, ratings and reviews.
                      </p>
                    </Col>
                    <br className="visible-xs"/>
                    <Col sm={4}>
                      <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png"/>
                      <h4 className="gc-profile-text-md gc-bold">
                        Receive bookings.
                      </h4>
                      <p className="gc-text gc-margin-bottom--lg">
                        Receive and review online bookings to cater events around London.
                      </p>
                    </Col>
                    <br className="visible-xs"/>
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
      <section className="gc-section">
        <Row>
          <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
            <h2 className="gc-section-heading gc-padding-none gc-margin-none">
              ONE PRICE, NO ADDITIONAL FEES.
            </h2>
            <br />
            <Row>
              <Col xs={12}>
                <Panel className="gc-panel--alert text-center">
                  <Row>
                    <Col xs={12}>
                      <h3 className="gc-heading gc-padding-small gc-margin-none">
                        £20<span className="gc-profile-text-lg"> /month</span>
                        <p className="gc-profile-text-md">
                          (after your first booking)
                        </p>
                      </h3>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col sm={4}>
                      <p className="gc-profile-text-md">
                        Online Bookings
                      </p>
                      <p className="gc-text">
                        Email and SMS alerts make it easy to receive and view bookings requests on any device.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <p className="gc-profile-text-md">
                        Ratings & Reviews
                      </p>
                      <p className="gc-text">
                        Build trust with your hosts by receiving ratings and reviews from your happy customers.
                      </p>
                    </Col>
                    <Col sm={4}>
                      <p className="gc-profile-text-md">
                        Custom Filters
                      </p>
                      <p className="gc-text">
                        Customise your minimum requirements and filter bookings that won't be worth your time and energy.
                      </p>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12}>
                      <p className="gc-profile-text-md gc-bold">No additional fees. No contract. Pause your subscription at any time.</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} smOffset={4}>
                      <Link to="/caterers/register">
                        <Button block className="gc-btn gc-btn--orange gc-margin-top--lg">
                          Get started
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};
