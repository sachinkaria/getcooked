import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';
import classNames from 'classnames';

const BookingItem = (props) => {
  const classes = classNames({
    'gc-text': true,
    'gc-pending': !props.booking.confirmed,
    'gc-confirmed': props.booking.confirmed,
    'pull-right--t': true
  });
  return (
    <Panel>
      <Col xs={12} sm={3} className="gc-center">
        <Image className="gc-thumbnail" src={props.chefPic} />
      </Col>
      <Col xs={12} sm={6}>
        <Row>
          <p className="gc-profile-text-md left-t">{props.chefName}</p>
        </Row>
        <Row>
          <div className="gc-bookingIcons-table">
            <div className="gc-booking-icon">
              <span className={`gc-icon gc-icon--${props.iconClass}`} /><p className="gc-text gc-text--sm">{props.booking.type}</p>
            </div>
            <div className="gc-booking-icon">
              <span className="gc-icon gc-icon--people" /><p className="gc-text gc-text--sm">{props.booking.guests}</p>
            </div>
            <div className="gc-booking-icon">
              <span className="gc-icon gc-icon--money" /><p className="gc-text gc-text--sm">£{props.booking.budget}</p>
            </div>
          </div>
        </Row>
      </Col>
      <Col xs={12} sm={3}>
        <p className="gc-text pull-right--t">{moment(props.booking.date).format('MMMM Do YYYY')}</p>
        <p className={classes}>{props.booking.confirmed ? 'Confirmed' : 'Pending'}</p>
      </Col>
    </Panel>
  );
};


BookingItem.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingItem;
