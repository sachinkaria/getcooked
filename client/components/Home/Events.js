import React from 'react';
import { Link } from 'react-router';
import {Row, Col, Button} from 'react-bootstrap';

function WhoWeAre() {
  return (
    <section className="gc-section gc-section--grey center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading gc-padding-none gc-center">Upcoming Events</h3>
          <Row className="gc-margin-bottom">
            <Col xs={12} sm={4}>
              <img
                style={{ width: '100%', paddingTop: '15px' }}
                alt="The urban farming debate"
                src="/images/event-poster.jpg"
              />
            </Col>
            <Col xs={12} sm={8}>
              <h4 className="gc-profile-text-md gc-bold">Supper Club: The Urban Farming Debate + Guests</h4>
              <p className="gc-text gc-text--lg gc-margin-none">Lassco Ropewalk, Maltby Street, London</p>
              <p className="gc-text gc-text--lg">26th September 2018</p>
              <p className="gc-text gc-text--lg">
                Join us for a evening of food, cocktails and an insight into
                the advantages and disadvantages of urban farming.
              </p>
              <div>
                <Link to="/events/supper-club-the-urban-farming-debate">
                  <Button style={{ width: '150px' }} bsStyle="success" className="gc-btn gc-btn--white">
                    More Details
                  </Button>
                </Link>
                {/*<Link to={'/caterers'} className="gc-inline-block gc-link-default">*/}
                  {/*<p className="gc-text gc-text--lg">*/}
                    {/*More info*/}
                  {/*</p>*/}
                {/*</Link>*/}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default WhoWeAre;

