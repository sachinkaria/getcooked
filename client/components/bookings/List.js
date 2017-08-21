/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import users from '../../utils/data';
import getProfile from '../../utils/helpers';
import BookingItem from './Item';
import * as actions from '../../actions/bookings';

const NO_BOOKINGS = 'You currently have no bookings';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.props.getBookings();
  }

  renderContent() {
    if (this.props.bookings.length) {
      const bookings = this.props.bookings;
      return (
        <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3} className="center-m pull-left--t">
          <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Bookings</h3>
          {bookings.length > 0 ? bookings.map((booking, i) => {
            {/*const chefPic = getProfile(booking.chefID, users).imageUrl;*/}
            {/*const chefName = getProfile(booking.chefID, users).name;*/}
            const iconClass = booking.type.toLowerCase();
            return (
              <BookingItem
                key={i}
                chefName={'sachin'}
                chefPic={'images/3.jpg'}
                booking={booking}
                iconClass={iconClass}
              />
            );
          }) : <p className="gc-profile-text-sm ">{NO_BOOKINGS}</p>}
          {
          }
        </Col>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Bookings.propTypes = {
  bookings: PropTypes.array.isRequired,
  getBookings: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { bookings: state.user.bookings };
}

export default connect(mapStateToProps, actions)(Bookings);
