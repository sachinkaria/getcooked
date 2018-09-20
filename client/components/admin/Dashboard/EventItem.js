import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {Link} from 'react-router';
import {Row, Col, Panel, Button} from 'react-bootstrap';
import Status from '../../Status';

function EventItem({userItem, booking, updateEvent}) {
  const ACCEPTED_BOOKINGS = _.filter(booking.bookings, item => (item.status === 'accepted' || item.status === 'deposit requested')).length;
  console.log(booking.bookings);
  return (
    <Row>
      <Col xs={12}>
        <Panel id="collapsible-panel-example-2">
          <Panel.Heading>
            <Panel.Title toggle>
              <Row>
                <Col xs={6}>
                  <p className="gc-text text-left text-capitalize">
                    {userItem.firstName} {userItem.lastName}
                  </p>
                  <p className="gc-text text-left">
                    {(booking.bookings.length > 0) && 'Accepted: ' + ACCEPTED_BOOKINGS}
                  </p>
                </Col>
                <Col xs={6}>
                  <p className="gc-text text-right">{moment(booking.updatedAt).format('MMMM Do YYYY')}</p>
                  <div className="text-right">
                    <Status status={booking.status}/>
                  </div>
                </Col>
              </Row>
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
                        src="/images/calendar-grey.png"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                        {moment(booking.date).format('MMMM Do YYYY')}
                      </p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="location"
                        src="/images/location-grey.png"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                        {booking.address.line1}, <span>{_.toUpper(booking.address.postcode)}</span>
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
                        <p className="gc-text gc-text--lg gc-inline-block">
                          {moment(booking.startTime).format('HH:mm')} to {moment(booking.endTime).format('HH:mm')}
                        </p>
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
                      <p className="gc-text gc-text--lg gc-inline-block"> {userItem.mobileNumber || 'Not Provided'}</p>
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
                  <div>
                    {((booking.openToVegan !== undefined) && booking.openToVegan) &&
                    <div>
                      <p className="gc-text gc-text--lg gc-margin-none gc-inline-block">
                        Open to Vegan
                      </p>
                    </div>
                    }
                    {((booking.openToVegetarian !== undefined) && booking.openToVegetarian) &&
                    <div>
                      <p className="gc-text gc-text--lg gc-margin-none gc-inline-block">
                        Open to Vegetarian
                      </p>
                    </div>
                    }
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
                            onClick={() => updateEvent(booking._id, {status: 'confirmed'})}>
                      Mark as Confirmed
                    </Button>
                  }
                </Col>
              </Row>
              <hr/>
              <Row>
                {
                  (booking.bookings.length > 0) &&
                  <Col xs={12}>
                    <p className="gc-text gc-grey">Bookings Sent</p>
                    {
                      booking.bookings.map((item) => {
                        return (
                          <Panel key={item._id} id="collapsible-panel-example-2">
                            <Panel.Heading>
                              <Panel.Title toggle>
                                <Row className="gc-text gc-bold gc-capitalize">
                                  <Col xs={4}>
                                    <span>{item.chef.displayName}</span>
                                  </Col>
                                  <Col xs={4}>
                                    <span className="pull-right">{item.read ? 'read' : 'unread'}</span>
                                  </Col>
                                  <Col xs={4}>
                                    <span className="pull-right">{item.status}</span>
                                  </Col>
                                </Row>
                              </Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                              <Panel.Body>
                                {(item.quote && item.quote.amount) &&
                                <Panel className="gc-panel">
                                  <Panel.Body>
                                    <div>
                                      <span className="gc-text gc-text--lg gc-text--slim">Final Quote</span>
                                      <span className="gc-text gc-text--lg gc-grey pull-right">£{item.quote.amount}</span>
                                      <hr className="gc-hr-sm"/>
                                      <span className="gc-text gc-text--lg gc-text--slim">Deposit / Fee (5%)</span>
                                      <span className="gc-text gc-text--lg gc-grey pull-right">£{item.quote.depositAmount}</span>
                                      <hr className="gc-hr-sm"/>
                                      <span className="gc-text gc-text--lg gc-text--slim">Outstanding Balance</span>
                                      <span className="gc-text gc-text--lg gc-grey pull-right">£{item.quote.balanceDue}</span>
                                    </div>
                                  </Panel.Body>
                                </Panel>
                                }
                                {
                                  (item.messages && item.messages.length > 0) ? item.messages.map((message) => {
                                      return (
                                        <Panel className="gc-panel">
                                          <Panel.Body>
                                            <Row>
                                              <Col xs={12} sm={4}>
                                              <span
                                                className="gc-text gc-bold pull-left text-capitalize">{message._sender.displayName || message._sender.firstName}</span>
                                                <br/>
                                                <span
                                                  className="gc-text gc-bold pull-left">{moment(message.date).format('Do MMM YYYY')}</span>
                                              </Col>
                                              <Col xs={12} sm={8}>
                                                <p>{message.body}</p>
                                              </Col>
                                            </Row>
                                          </Panel.Body>
                                        </Panel>
                                      )
                                    }) :
                                    <span className="gc-text gc-bold center-block">No messages</span>
                                }
                              </Panel.Body>
                            </Panel.Collapse>
                          </Panel>
                        );
                      })
                    }
                  </Col>
                }
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
