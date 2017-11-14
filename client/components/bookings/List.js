import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookingItem from './ListItem';
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
        <Row>
          <Col className="gc-center">
            {bookings.map((booking, i) =>
              (
                <BookingItem
                  key={i}
                  booking={booking}
                  itemType={this.props.itemType}
                />
              )
            )
            }
          </Col>
        </Row>
      );
    }
    return (
      <p className="gc-text gc-center">{NO_BOOKINGS}</p>
    );
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
  bookings: React.PropTypes.array.isRequired,
  getBookings: React.PropTypes.func.isRequired,
  itemType: React.PropTypes.string
};

Bookings.defaultProps = {
  itemType: 'memberItem'
};

function mapStateToProps(state) {
  return {
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps, { getBookings })(Bookings);
