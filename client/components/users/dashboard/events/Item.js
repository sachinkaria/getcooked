import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import { readEvent } from '../../../../actions/events';

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
    console.log(event);
    return (
      <Row>
        <Col xs={12}>
          <Panel id="collapsible-panel-example-2">
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
              event.additionalInformation &&
              <Col xs={12} sm={8}>
                <p className="gc-text gc-grey">Additional Information</p>
                <p className="gc-text gc-text--lg gc-dark-grey">
                  {event.additionalInformation}
                </p>
              </Col>
            }
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
