import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListItem from '../chefs/ListItem';

function FeaturedChefs({ chefs }) {
  return (
    <section className="gc-section">
      <Row className="gc-margin-bottom--sm">
        <Col xs={12} sm={8} smOffset={2}>
          <h3 className="gc-section-heading gc-center">Featured Caterers</h3>
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
          <Row>
            <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              <Link to={'/caterers'}>
                <Button block className="gc-btn gc-btn--orange gc-btn--lg gc-margin-top">
                  View more
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default FeaturedChefs;

