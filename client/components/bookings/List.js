/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookingItem from './Item';
import { getBookings } from '../../actions/bookings';

const NO_BOOKINGS = 'You have no previous booking enquiries.';

class Bookings extends React.Component {
  componentWillMount() {
    this.props.getBookings();
  }

  renderContent() {
    if (this.props.bookings && this.props.bookings.length) {
      const { bookings } = this.props;
      return (
        <Col className="center-m pull-left--t">
          {bookings.map((booking, i) =>
            (
              <BookingItem
                key={i}
                chefName={'sachin'}
                chefPic={'images/3.jpg'}
                booking={booking}
              />
            )
          )
          }
        </Col>
      );
    }
    return (
      <p className="gc-profile-text-sm gc-center">{NO_BOOKINGS}</p>
    )
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
  return {
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps, { getBookings })(Bookings);
