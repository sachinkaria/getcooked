/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { Col } from 'react-bootstrap';
import users from '../../utils/data';
import getProfile from '../../utils/helpers';
import BookingItem from './Item';
import { connect } from 'react-redux';
import * as actions from '../../actions/bookings';

class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.props.getBookings();
    }

    renderContent() {
        if(this.props.bookings) {
            let bookings = this.props.bookings;
            return (
                <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3} className="center-m pull-left--t">
                    <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Bookings</h3>
                    {bookings.length > 0 ? bookings.map(function(booking, i){
                            let chefPic = getProfile(booking.chefID, users).imageUrl;
                            let chefName = getProfile(booking.chefID, users).name;
                            let iconClass = booking.type.toLowerCase();
                            return (
                                <BookingItem
                                    key={i}
                                    chefName={chefName}
                                    chefPic={chefPic}
                                    booking={booking}
                                    iconClass={iconClass}
                                />
                            )
                        }) : <p className="gc-profile-text-sm ">You currently have no bookings</p>}
                    {
                    }
                </Col>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { bookings: state.user.bookings };
}

export default connect(mapStateToProps, actions)(Bookings);