import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';

const ListItem = (props) => {
  if (props.itemType === 'chefItem') {
    return (
      <Col sm={12}>
        <Panel>
          <Row>
            <Col sm={3}>
              <Link to={`/chefs/${props.booking.chef._id}`}>
                <img alt={props.booking.chef.displayName} src={props.booking.chef.profilePhoto} className="gc-thumbnail gc-thumbnail--sm gc-margin-bottom--xs" />
              </Link>
            </Col>
            <Col sm={5} className="center-m left-t">
              <Link to={`/chefs/${props.booking.chef._id}`}>
                <p className="gc-form-heading text-capitalize">{props.booking.chef.displayName}</p>
              </Link>
              <p className="gc-text"><span className="gc-bold">Event date:</span> {moment(props.booking.date).format('MMMM Do YYYY')}</p>
              <p className="gc-text"><span className="gc-bold">Type of event:</span> <span className="text-capitalize">{props.booking.eventType}</span></p>
            </Col>
            <Col sm={4} className="center-m right-t">
              <p className="gc-text hidden-xs">{moment(props.booking.createdAt).format('MMMM Do YYYY')}</p>
              <Link to={`/dashboard/bookings/${props.booking._id}`} className="btn gc-btn gc-btn-white gc-margin-top">
                View Details
              </Link>
            </Col>
          </Row>
        </Panel>
      </Col>
    );
  }
  return (
    <Col xs={12}>
      <Panel className={!props.booking.read && 'gc-panel--alert'}>
        <Row>
          <Col className="center-m left-t" sm={6}>
            <p className="gc-form-heading text-capitalize">{props.booking.user.firstName} {props.booking.user.lastName}</p>
            <p className="gc-text">Email: {props.booking.user.email}</p>
            <p className="gc-text">Mobile number: {props.booking.user.mobileNumber}</p>
          </Col>
          <Col sm={6} className="center-m right-t">
            <p className="gc-text hidden-xs">Received: {moment(props.booking.createdAt).format('MMMM Do YYYY')}</p>
            <Link to={`/dashboard/bookings/${props.booking._id}`} className="btn gc-btn gc-btn-white gc-margin-top">
              View Details
            </Link>
          </Col>
        </Row>
      </Panel>
    </Col>
  );
};


ListItem.propTypes = {
  booking: PropTypes.object.isRequired
};

export default ListItem;
