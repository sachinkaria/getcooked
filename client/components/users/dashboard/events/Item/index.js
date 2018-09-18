/**
 * Created by sachinkaria on 15/09/2018.
 */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Panel } from 'react-bootstrap';
import { readEvent } from '../../../../../actions/events';
import Notification from '../../../../../components/Notification';
import CatererItem from './CatererItem';

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
  }

  componentWillMount() {
    const ID = this.props.id;
    this.props.readEvent(ID);
  }

  getStatus() {
    switch (this.props.booking.status) {
      case 'accepted':
        return (<span className="gc-text gc-text--xl text-capitalize gc-light-green">Accepted</span>);
      case 'declined':
        return (<span className="gc-text gc-text--xl text-capitalize gc-red">Declined</span>);
      default:
        return (<span className="gc-text gc-text--xl text-capitalize gc-yellow">Pending</span>);
    }
  }

  renderContent() {
    const { event } = this.props;
    const { bookings } = event;
    const NOT_PENDING_BOOKINGS = _.filter(bookings, function(booking) {
      const NOT_PENDING = booking.status !== 'pending';
      return NOT_PENDING;
    });

    const ACCEPTED_BOOKINGS = _.filter(NOT_PENDING_BOOKINGS, function(booking) {
      const NOT_DECLINED = booking.status !== 'declined';
      return NOT_DECLINED;
    });

    return (
      <Row>
        {
          (ACCEPTED_BOOKINGS.length < 1) &&
          <Col className="text-center" xs={12} sm={6} smOffset={3}>
            <Notification
              text="You will be notified when a caterer or chef is available for and interested in your event."
            />
          </Col>
        }
        <Col xs={12}>
          <h2 className="gc-profile-heading-sm">Event Details</h2>
        </Col>
        <Col xs={12}>
          <Panel className="gc-panel" id="collapsible-panel-example-2">
            <Panel.Body>
              <Row>
                <Col xs={12}>
                  <Row>
                    <Col xs={12} sm={6} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="location"
                        src="/images/calendar-grey.png"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                        {moment(event.date).format('MMMM Do YYYY')}
                      </p>
                    </Col>
                    <Col xs={12} sm={6} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="people"
                        src="/images/people-grey.png"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">{event.numberOfPeople} people</p>
                    </Col>
                    <Col xs={12} sm={6} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="location"
                        src="/images/location-grey.png"
                      />
                      <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                        {event.address.line1}, <span>{_.toUpper(event.address.postcode)}</span>
                      </p>
                    </Col>
                    <Col xs={12} sm={6} className="gc-margin-bottom--xs">
                      <img
                        className="gc-icon"
                        alt="budget"
                        src="/images/money-grey.png"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">£{event.budget || 1500}</p>
                    </Col>
                    {
                      (event.startTime && event.endTime) &&
                      <Col xs={12} sm={6} className="gc-margin-bottom--xs">
                        <img
                          className="gc-icon"
                          alt="budget"
                          src="/images/clock-grey.png"
                        />
                        <p className="gc-text gc-text--lg gc-inline-block">
                          {moment(event.startTime).format('HH:mm')} to {moment(event.endTime).format('HH:mm')}
                        </p>
                      </Col>
                    }
                  </Row>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={6} sm={4}>
                  <p className="gc-text gc-grey">Event Type</p>
                  <div className="gc-margin-bottom">
                    {
                      event.eventType.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={6} sm={4}>
                  <p className="gc-text gc-grey">Services Required</p>
                  <div className="gc-margin-bottom">
                    {
                      event.services.map((service) => {
                        return (
                          <p key={service} className="text-capitalize gc-margin-none gc-text gc-text--lg">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={12} sm={4} xsHidden>
                  <p className="gc-text gc-grey">Additional Equipment</p>
                  <div className="gc-margin-bottom">
                    {
                      event.additionalEquipment.map((service) => {
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
              <Row>
                <Col xs={6} sm={4}>
                  <p className="gc-text gc-grey">Food Style</p>
                  <div className="gc-margin-bottom">
                    {
                      event.foodStyle.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </div>
                </Col>
                <Col xs={6} sm={4}>
                  <p className="gc-text gc-grey">Type of Food</p>
                  <div>
                    {((event.openToVegan !== undefined) && event.openToVegan) &&
                    <div>
                      <p className="gc-text gc-text--lg gc-margin-none gc-inline-block">
                        Open to Vegan
                      </p>
                    </div>
                    }
                    {((event.openToVegetarian !== undefined) && event.openToVegetarian) &&
                    <div>
                      <p className="gc-text gc-text--lg gc-margin-none gc-inline-block">
                        Open to Vegetarian
                      </p>
                    </div>
                    }
                    <div className="gc-margin-bottom">
                      {
                        event.foodServices.map((service) => {
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
                <Col xsHidden xs={12} sm={4}>
                  <p className="gc-text gc-grey">Kitchen Available</p>
                  <div className="gc-margin-bottom">
                    {
                      <p className="gc-text gc-text--lg">{ event.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                    }
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
          <Row>
            {
              ACCEPTED_BOOKINGS.length > 0 &&
              (
                <Col xs={12}>
                  <h2 className="gc-profile-heading-sm">Interested Caterers and Chefs</h2>
                </Col>
              )
            }
            <Col xs={12}>
              {
                ACCEPTED_BOOKINGS.length > 0 && ACCEPTED_BOOKINGS.map((booking) => {
                  return (
                    <CatererItem eventId={this.props.params.id} key={booking._id} status={booking.status} id={booking._id} caterer={ booking.chef } />
                  );
                })
              }
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      (this.props.event) ?
        <div>
          {this.renderContent()}
        </div>
        :
        <div className="text-center">
          <span className="gc-icon gc-icon--xl gc-icon--loading" />
          <div>
            Loading...
          </div>
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    event: state.user.event
  };
}

export default connect(mapStateToProps, { readEvent })(EventItem);
