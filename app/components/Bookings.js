/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import currentUser from '../utils/currentUser';
import { Col, Panel, Thumbnail } from 'react-bootstrap';
import moment from 'moment';
import users from '../utils/data';
import getProfile from '../utils/helpers';

class Bookings extends React.Component {
    render() {
        let bookings = currentUser.bookings;
        return (
            <Col xs={8} xsOffset={2}>
                <h3 className="gc-profile-heading-lg">Bookings</h3>
                {bookings.length > 0 ? bookings.map(function(booking, i){
                    let chefPic = getProfile(booking.chefID, users).imageUrl;
                    let chefName = getProfile(booking.chefID, users).name;
                        return (
                            <Panel key={i}>
                                <Col xs={4}>
                                    <Thumbnail className="gc-booking-thumbnail" src={chefPic}/>
                                </Col>
                                <Col xs={4}>
                                    <h3 className="gc-profile-text-md gc-margin-none">{chefName}</h3>
                                    <h3 className="gc-profile-text-sm">Type of event: {booking.type}</h3>
                                    <h3 className="gc-profile-text-sm">Number of people: {booking.guests}</h3>
                                    <h3 className="gc-profile-text-sm">Budget: {booking.budget}</h3>
                                </Col>
                                <Col xs={4}>
                                    <h3 className="gc-profile-text-sm right gc-margin-none">{moment(booking.date).format('MMMM Do YYYY')}</h3>
                                    <h3 className="gc-profile-text-sm right">{booking.confirmed ? 'Confirmed' : 'Pending'}</h3>
                                </Col>
                            </Panel>
                        )
                    }) : <p className="gc-profile-text-sm">You currently have no bookings</p>}
                {
            }
            </Col>
        )
    }
}

export default Bookings;
