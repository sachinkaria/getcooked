import React from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap';
import {Link} from 'react-router';

class Caterer extends React.Component {
  render() {
    const priceSectionStyle = {
      backgroundImage: 'url(/images/catering-2.jpg)',
      backgroundSize: 'cover'
    };
    return (
      <div>
        <section className="gc-section gc-section--main gc-section--grey">
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
              <Row>
                <Col sm={10}>
                  <h1 className="gc-title">
                    Grow your catering business.
                  </h1>
                  <h2 className="gc-heading">
                    Receive online bookings and cater events around you.
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
                        <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                          Profiles include information, pictures, sample menus, ratings and reviews.
                        </p>
                      </Col>
                      <br className="visible-xs" />
                      <Col sm={4}>
                        <img className="gc-info-icon" alt="Share and enjoy food" src="/images/event.png"/>
                        <h4 className="gc-profile-text-md gc-bold">
                          Receive bookings.
                        </h4>
                        <p className="gc-text gc-text--lg gc-margin-bottom--lg">
                          Receive and review online bookings to cater events around London.
                        </p>
                      </Col>
                      <br className="visible-xs" />
                      <Col sm={4}>
                        <img className="gc-info-icon" alt="Share and enjoy food" src="/images/food.png"/>
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
              <Row>
                <Col sm={4} smOffset={4}>
                  <Link to="/caterers/register">
                    <Button onClick={() => heap.track('Click Sign Up', { role: 'caterer' })}  block className="gc-btn gc-btn--lg gc-btn--orange">
                      Get started
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        <section className="gc-section" style={priceSectionStyle}>
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
              <h2 className="gc-section-heading gc-white">
                ONE PRICE, NO ADDITIONAL FEES.
              </h2>
              <br />
              <Row>
                <Col xs={12}>
                  <Panel className="gc-panel gc-panel--translucent text-center">
                    <Row>
                      <Col xs={12}>
                        <h3 className="gc-heading gc-padding-small gc-margin-none">
                          £20<span className="gc-profile-text-lg"> /month*</span>
                          <p className="gc-profile-text-md">
                            *your subscription only starts after you receive your first booking
                          </p>
                        </h3>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm={4}>
                        <p className="gc-profile-text-md gc-bold">
                          Online Bookings
                        </p>
                        <p className="gc-text gc-text--lg">
                          Email and SMS alerts make it easy to receive and view booking requests on any device.
                        </p>
                      </Col>
                      <Col sm={4}>
                        <p className="gc-profile-text-md gc-bold">
                          Ratings & Reviews
                        </p>
                        <p className="gc-text gc-text--lg">
                          Build trust with your hosts by receiving ratings and reviews from your happy customers.
                        </p>
                      </Col>
                      <Col sm={4}>
                        <p className="gc-profile-text-md gc-bold">
                          Direct Contact
                        </p>
                        <p className="gc-text gc-text--lg">
                          Customer contact details allow you communicate directly and provide a personalised experience.
                        </p>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={12}>
                        <p className="gc-profile-text-md gc-bold">No additional fees. No contracts. Pause your
                          subscription at any time.</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={4} smOffset={4}>
                        <Link to="/caterers/register">
                          <Button onClick={() => heap.track('Click Sign Up', { role: 'caterer' })} block className="gc-btn gc-btn--lg gc-btn--orange gc-margin-top--lg">
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
  }
}

export default Caterer;