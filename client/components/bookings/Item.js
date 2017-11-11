import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';

const BookingItem = (props) => {
  if (props.itemType === 'chefItem') {
    return (
      <Col sm={6}>
        <Panel>
          <Row className="gc-center">
            <Col>
              <Link to={`/chefs/${props.booking.chef._id}`}>
                <img alt={props.booking.chef.displayName} src={props.booking.chef.profilePhoto} className="gc-thumbnail gc-margin-bottom--xs" />
                <p className="gc-form-heading text-capitalize">{props.booking.chef.displayName}</p>
              </Link>
            </Col>
          </Row>
          <Col>
            <div>
              <p className="gc-text"><span className="gc-bold">Event date:</span> {moment(props.booking.date).format('MMMM Do YYYY')}</p>
              <p className="gc-text"><span className="gc-bold">Type of event:</span> <span className="text-capitalize">{props.booking.event_type}</span></p>
              <p className="gc-text"><span className="gc-bold">Number of guests (approx.):</span> {props.booking.number_of_people}</p>
            </div>
          </Col>
          {
            props.booking.additional_information &&
            <Row className="gc-margin-top gc-center">
              <Col xs={12}>
                <p className="gc-text gc-bold">Additional Information</p>
                <p className="gc-text gc-dark-grey">
                  {props.booking.additional_information}
                </p>
              </Col>
            </Row>
          }
        </Panel>
      </Col>
    );
  }
  return (
    <Col xs={12}>
      <Panel>
        <Row>
          <Col md={6}>
            <div>
              <p className="gc-form-heading text-capitalize">{props.booking.user.firstName} {props.booking.user.lastName}</p>
              <p className="gc-text"><span className="gc-bold">Mobile number:</span> +44 {props.booking.user.mobileNumber}</p>
              <p className="gc-text"><span className="gc-bold">Email address:</span> {props.booking.user.email}</p>
            </div>
          </Col>
          <hr className="hidden-lg hidden-md"/>
          <Col md={6}>
            <div>
              <p className="gc-form-heading">Event details</p>
              <p className="gc-text"><span className="gc-bold">Event date:</span> {moment(props.booking.date).format('MMMM Do YYYY')}</p>
              <p className="gc-text"><span className="gc-bold">Type of event:</span> <span className="text-capitalize">{props.booking.event_type}</span></p>
              <p className="gc-text"><span className="gc-bold">Number of guests (approx.):</span> {props.booking.number_of_people}</p>
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
    </Col>
  );
};


BookingItem.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingItem;
