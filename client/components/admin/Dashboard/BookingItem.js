import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import {Row, Col, Panel, Button } from 'react-bootstrap';

function BookingItem({ chefItem, booking }) {
  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Col xs={3}>
            <p className="gc-text gc-grey">Caterer</p>
            <p className="gc-text text-capitalize">{chefItem.displayName}</p>
          </Col>
          <Col xs={3}>
            <p className="gc-text gc-grey">Status</p>
            <p className="gc-text">{booking.status}</p>
          </Col>
          <Col xs={3}>
            <p className="gc-text gc-grey">Budget</p>
            <p className="gc-text">£{booking.budget || 1500}</p>
          </Col>
          <Col xs={3}>
            <p className="gc-text gc-grey">Updated At</p>
            <p className="gc-text">{moment(booking.updatedAt).format('MMMM Do YYYY')}</p>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}


BookingItem.propTypes = {
  chefItem: React.PropTypes.shape({
    displayName: React.PropTypes.string
  }).isRequired
};

export default BookingItem;
