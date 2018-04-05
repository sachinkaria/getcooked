import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListItem from '../chefs/ListItem';

function Main({ chefs }) {
  return (
    <section className="gc-section gc-section--main text-left">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h1 className="gc-title">Get Cooked</h1>
          <h2 className="gc-heading">Cater your events with the coolest chefs around.</h2>
          <div className="gc-margin-bottom gc-padding-none">
            <div className="gc-center">
              <h3 className="gc-profile-text-md gc-bold gc-margin-bottom--lg">Featured Caterers</h3>
              <Row className="gc-margin-bottom--sm">
                {
                  (chefs.length > 0) &&
                  chefs.map(chef => (
                    <ListItem
                      isHome
                      id={chef._id}
                      key={chef._id}
                      profilePhoto={chef.profilePhoto}
                      name={chef.displayName}
                      rating={chef.rating}
                      tagLine={chef.tagLine}
                      endorsements={chef.endorsements}
                      numberOfReviews={chef.numberOfReviews}
                      serviceType={chef.serviceType}
                    />
                  ))
                }
              </Row>
              <Row>
                <Col sm={4} smOffset={4}>
                  <Link to={'/caterers'}>
                    <Button block className="gc-btn gc-btn--orange gc-btn--search">
                      View more
                    </Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default Main;

