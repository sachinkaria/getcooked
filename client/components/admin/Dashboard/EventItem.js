import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import {Row, Col, Panel, Button } from 'react-bootstrap';

function EventItem({userItem, booking}) {
  return (
    <Row>
      <Col xs={12}>
        <Panel>
          <Panel.Heading className="gc-text gc-bold">Event Details</Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={12}>
                <p className="gc-text gc-grey">Contact Details</p>
                <p className="gc-text">
                  {userItem.firstName} {userItem.lastName}
                </p>
                <p className="gc-text">
                  {userItem.email}
                </p>
                <p className="gc-text">
                  {userItem.mobileNumber}
                </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Date</p>
                <p className="gc-text">{moment(booking.date).format('MMMM Do YYYY')}</p>
                <hr className="visible-xs"/>
              </Col>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Event Address</p>
                <p className="gc-text gc-margin-none">
                  {booking.address.line1} {booking.address.line2},
                </p>
                <p className="gc-text gc-margin-none">
                  {booking.address.city},
                </p>
                <p className="gc-text">
                  {booking.address.postcode}
                </p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Event Type</p>
                <p className="gc-text text-capitalize">{booking.eventType}</p>
              </Col>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Number of guests</p>
                <p className="gc-text">{booking.numberOfPeople} people</p>
              </Col>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Budget</p>
                <p className="gc-text">£{booking.budget || 1500}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Services Required</p>
                <div className="gc-margin-bottom">
                  {
                    booking.services.map((service) => {
                      return (
                        <p key={service} className="text-capitalize gc-margin-none">
                          {service}
                        </p>
                      );
                    })
                  }
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <p className="gc-text gc-grey">Type of Food</p>
                <div className="gc-margin-bottom">
                  {
                    booking.foodServices.map((service) => {
                      return (
                        <p key={service} className="text-capitalize gc-margin-none">
                          {service}
                        </p>
                      );
                    })
                  }
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <Link to='/admin/dashboard/chefs'>
                  <Button onClick={localStorage.setItem('event', JSON.stringify(booking))}>Send to Caterers</Button>
                </Link>
              </Col>
            </Row>
            {
              booking.additionalInformation &&
              <Row>
                <Col xs={12}>
                  <hr />
                  <p className="gc-text gc-grey">Additional Information</p>
                  <p className="gc-text gc-dark-grey">
                    {booking.additionalInformation}
                  </p>
                </Col>
              </Row>
            }
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  );
}


EventItem.propTypes = {
  userItem: React.PropTypes.shape({
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    mobileNumber: React.PropTypes.string
  }).isRequired
};

export default EventItem;
