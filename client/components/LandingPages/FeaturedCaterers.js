import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import ListItem from '../chefs/ListItem';

function FeaturedCaterer(props) {
  const style = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: 'cover'
  };
  return (
    <section className="gc-section">
      <Row className="gc-margin-bottom--sm">
        <Col xs={12} sm={8} smOffset={2}>
          <h3 className="gc-section-heading gc-center">{props.title}</h3>
          {
            (props.chefs.length > 0) &&
            props.chefs.map(chef => (
              <ListItem
                isHome
                id={chef._id}
                key={chef._id}
                {...chef}
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

export default FeaturedCaterer;
