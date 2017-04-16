/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import currentUser from '../utils/currentUser';
import { Col } from 'react-bootstrap';
import users from '../utils/data';
import getProfile from '../utils/helpers';
import BookingItem from './BookingItem';

class Bookings extends React.Component {
    render() {
        let bookings = currentUser.bookings;
        return (
            <Col xs={12} sm={10} smOffset={1} lg={8} lgOffset={2} className="center-m pull-left--t">
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

export default Bookings;
