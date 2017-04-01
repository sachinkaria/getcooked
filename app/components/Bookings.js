/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import currentUser from '../utils/currentUser';
import { Col, Panel, Image } from 'react-bootstrap';
import moment from 'moment';
import users from '../utils/data';
import getProfile from '../utils/helpers';
import classNames from 'classnames';

class Bookings extends React.Component {
    render() {
        let bookings = currentUser.bookings;
        return (
            <Col xs={12} md={8} mdOffset={2} className="center-m">
                <h3 className="gc-profile-heading-lg">Bookings</h3>
                <hr/>
                {bookings.length > 0 ? bookings.map(function(booking, i){
                    let chefPic = getProfile(booking.chefID, users).imageUrl;
                    let chefName = getProfile(booking.chefID, users).name;
                    let classes = classNames({
                        'gc-pending' : !booking.confirmed,
                        'gc-confirmed' : booking.confirmed,
                        'gc-right': true
                    });
                        return (
                            <Panel key={i}>
                                <Col xs={12} sm={3}>
                                    <Image className="gc-booking-thumbnail" src={chefPic}/>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <p className="gc-profile-text-md">{chefName}</p>
                                    <span className="gc-icon gc-icon--wedding pull-left"/><p className="gc-text-xs pull-left">{booking.type}</p>
                                    <span className="gc-icon gc-icon--people pull-left gc-margin-left"/><p className="gc-text-xs pull-left">{booking.guests}</p>
                                    <span className="gc-icon gc-icon--money pull-left gc-margin-left"/><p className="gc-text-xs pull-left">£{booking.budget}</p>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <p className="gc-text-xs gc-right">{moment(booking.date).format('MMMM Do YYYY')}</p>
                                    <p className={classes}>{booking.confirmed ? 'Confirmed' : 'Pending'}</p>
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
