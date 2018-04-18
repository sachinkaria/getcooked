import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import BookingForm from '../../containers/BookingForm';
import ListItem from '../chefs/ListItem';

function Main({ chefs }) {
  const style = {
    backgroundImage: 'url(/images/dining.jpg)',
    backgroundSize: 'cover'
  };
  return (
    <div>
      <section style={style} className="gc-section gc-section--main text-left">
        <Row style={{ paddingTop: '85px' }}>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h1 className="gc-title">Get Cooked</h1>
            <h2 className="gc-heading gc-white">Cater your events with the coolest chefs around.</h2>
            <div className="gc-margin-bottom gc-padding-none">
              <div className="gc-center">
                <Row style={{ paddingBottom: '60px', paddingTop: '25px' }}>
                  <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                    <BookingForm large action="Get Quotes" />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </section>
      <section className="gc-section">
        <Row className="gc-margin-bottom--sm">
          <Col xs={10} xsOffset={1}>
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
              <Col sm={4} smOffset={4}>
                <Link to={'/caterers'}>
                  <Button block className="gc-btn gc-btn--orange gc-btn--search gc-margin-top">
                    View more
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default Main;

