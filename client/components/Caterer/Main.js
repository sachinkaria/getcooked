import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import ListItem from '../chefs/ListItem';

function Main() {
  const style = {
    backgroundImage: 'url(/images/grow-your-business.jpg)',
    backgroundSize: 'cover'
  };
  return (
    <section style={style} className="gc-section gc-section--main">
      <Row>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
          <Row style={{ paddingTop: '85px' }}>
            <Col sm={10}>
              <h1 className="gc-title">
                Grow your catering business.
              </h1>
              <h2 className="gc-heading gc-white">
                Receive online bookings and cater events around you.
              </h2>
            </Col>
          </Row>
          <Row style={{ paddingBottom: '85px' }}>
            <Col sm={4} smOffset={4}>
              <Link to="/caterers/register">
                <Button
                  onClick={() => heap.track('Click Sign Up', { role: 'caterer' })}
                  block
                  className="gc-btn gc-btn--lg gc-btn--orange"
                >
                  Get started
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Main;

