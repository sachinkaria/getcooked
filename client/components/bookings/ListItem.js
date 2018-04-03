import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
  }

  getStatus() {
     switch (this.props.booking.status) {
      case 'accepted':
        return (<p className="gc-text text-capitalize gc-light-green">Accepted</p>);
      case 'declined':
        return (<p className="gc-text text-capitalize gc-red">Declined</p>);
      default:
        return (<p className="gc-text text-capitalize gc-yellow">Pending</p>);
    }
  }

  render() {
    const { booking } = this.props;
    const STATUS = this.getStatus();
    if (this.props.itemType === 'chefItem') {
      return (
        <Col sm={12}>
          <Panel className="gc-panel">
            <Panel.Body>
              <Row>
                <Col sm={3}>
                  <Link to={`/chefs/${booking.chef._id}`}>
                    <img
                      alt={booking.chef.displayName}
                      src={booking.chef.profilePhoto}
                      className="gc-thumbnail gc-thumbnail--sm gc-margin-bottom--xs"
                    />
                  </Link>
                </Col>
                <Col sm={5} className="center-m left-t">
                  <Link to={`/chefs/${booking.chef._id}`}>
                    <p className="gc-form-heading text-capitalize">{booking.chef.displayName}</p>
                  </Link>
                  <p className="gc-text"><span
                    className="gc-bold">Event date:</span> {moment(booking.date).format('MMMM Do YYYY')}</p>
                  <p className="gc-text">
                    <span className="gc-bold">Type of event:</span>
                    <span className="text-capitalize">{booking.eventType}</span>
                  </p>
                </Col>
                <Col sm={4} className="center-m right-t">
                  <p className="gc-text hidden-xs">{moment(booking.createdAt).format('MMMM Do YYYY')}</p>
                  <Link to={`/dashboard/bookings/${booking._id}`} className="btn gc-btn gc-btn-white gc-margin-top">
                    View Details
                  </Link>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        </Col>
      );
    }
    return (
      <Col xs={12}>
        <Panel className={!booking.read && 'gc-panel gc-panel--alert gc-bold'}>
          <Panel.Body>
            <Row>
              <Col sm={2}>
                <img
                  alt="Profile Image"
                  src="/images/default_profile.png"
                  className="gc-thumbnail gc-thumbnail--xs"
                />
              </Col>
              <Col className="center-m left-t" sm={5}>
                <p className="gc-text text-capitalize gc-margin-none">
                  {booking.user.firstName}
                </p>
                <p className="gc-text hidden-xs gc-margin-none">
                  {moment(booking.createdAt).format('MMMM Do YYYY')}
                </p>
              </Col>
              <Col sm={5} className="center-m right-t">
                {STATUS}
                <Link to={`/dashboard/bookings/${booking._id}`} className="btn gc-btn gc-btn-white">
                  View Details
                </Link>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
};


ListItem.propTypes = {
  booking: PropTypes.object.isRequired
};

export default ListItem;
