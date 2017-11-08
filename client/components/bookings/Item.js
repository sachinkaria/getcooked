import React from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';
import classNames from 'classnames';

const BookingItem = (props) => {
  return (
    <Panel>
      <Row>
        <Col xs={12} sm={9}>
          <p className="gc-form-heading left-t text-capitalize">{props.booking.user.firstName} {props.booking.user.lastName}</p>
          <div>
            <p className="gc-text">Event date: {moment(props.booking.date).format('MMMM Do YYYY')}</p>
            <p className="gc-text">Type of event: <span className="text-capitalize">{props.booking.event_type}</span></p>
            <p className="gc-text">Number of guests (approx.): {props.booking.number_of_people}</p>
          </div>
        </Col>
      </Row>
      {
        props.booking.additional_information &&
        <Row className="gc-margin-top">
          <Col xs={12}>
            <p className="gc-text gc-bold">Additional Information</p>
            <p className="gc-text gc-dark-grey">
              {props.booking.additional_information}
            </p>
          </Col>
        </Row>
      }
    </Panel>
  );
};


BookingItem.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingItem;
