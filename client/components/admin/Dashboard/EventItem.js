import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import {Row, Col, Panel, Button} from 'react-bootstrap';
import Status from '../../Status';
import Item from '../../bookings/Item';

function EventItem({userItem, booking, updateEvent}) {
  return (
    <Row>
      <Col xs={12}>
        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>
            <Panel.Title toggle>
              <p className="gc-text pull-left">
                {userItem.firstName} {userItem.lastName}
              </p>
              <p className="gc-text text-right">{moment(booking.updatedAt).format('MMMM Do YYYY')}</p>
              <div className="text-right">
                <Status status={booking.status}/>
              </div>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <Row>
                <Col xs={12} sm={6}>
                  <Row>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="location"
                        src="/images/location-grey.png"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                        {booking.address.line1}, {booking.address.postcode}
                      </p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="people"
                        src="/images/people-grey.png"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">{booking.numberOfPeople} people</p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="budget"
                        src="/images/money-grey.png"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">£{booking.budget || 1500}</p>
                    </Col>
                    {
                      (booking.startTime && booking.endTime) &&
                      <Col xs={12} className="gc-margin-bottom--xs">
                        <img
                          className="gc-icon"
                          alt="budget"
                          src="/images/clock-grey.png"
                        />
                        <p className="gc-text gc-text--lg gc-inline-block">{moment(booking.startTime).format('HH:mm')} to {moment(booking.endTime).format('HH:mm')}</p>
                      </Col>
                    }
                  </Row>
                </Col>
                <Col xs={12} sm={6}>
                  <Row>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="name"
                        src="/images/contact-grey.png"
                        className="gc-icon"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">{userItem.firstName}</p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="phone"
                        src="/images/phone-grey.png"
                        className="gc-icon"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block"> {userItem.mobileNumber}</p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="email"
                        src="/images/letter-grey.png"
                        className="gc-icon"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">{userItem.email}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={12} sm={4}>
                  <p className="gc-text gc-grey">Event Type</p>
                  <div className="gc-margin-bottom">
                    {
                      booking.eventType.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <p className="gc-text gc-grey">Additional Equipment</p>
                  <div className="gc-margin-bottom">
                    {
                      booking.additionalEquipment.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <p className="gc-text gc-grey">Food Style</p>
                  <div className="gc-margin-bottom">
                    {
                      booking.foodStyle.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
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
                          <p key={service} className="text-capitalize gc-margin-none gc-text gc-text--lg">
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
                          <p key={service} className="text-capitalize gc-margin-none gc-text gc-text--lg">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <p className="gc-text gc-grey">Kitchen Available</p>
                  <div className="gc-margin-bottom">
                    {
                      <p className="gc-text gc-text--lg">{ booking.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                    }
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                {
                  booking.additionalInformation &&
                    <Col xs={12} sm={8}>
                      <p className="gc-text gc-grey">Additional Information</p>
                      <p className="gc-text gc-text--lg gc-dark-grey">
                        {booking.additionalInformation}
                      </p>
                    </Col>
                }
                <Col xs={12} sm={4}>
                  <Link to={'/admin/dashboard/chefs'}>
                    <Button className="gc-btn gc-btn--white gc-margin-bottom--sm"
                            onClick={() => sessionStorage.setItem('event', JSON.stringify(booking))}>
                      Send to Caterers
                    </Button>
                  </Link>
                  {
                    booking.status === 'pending' &&
                    <Button className="gc-btn gc-btn--orange"
                            onClick={() => updateEvent(booking._id, {status: 'contacted'})}>
                      Mark as Contacted
                    </Button>
                  }
                  {
                    booking.status === 'contacted' &&
                    <Button className="gc-btn gc-btn--orange"
                            onClick={() => updateEvent(booking._id, {status: 'confirmed'})}>
                      Mark as Confirmed
                    </Button>
                  }
                </Col>
              </Row>
            </Panel.Body>
          </Panel.Collapse>
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
