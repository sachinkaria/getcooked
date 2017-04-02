/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import currentUser from '../utils/currentUser';
import { Col, Row, Panel, Image } from 'react-bootstrap';
import moment from 'moment';
import users from '../utils/data';
import getProfile from '../utils/helpers';
import classNames from 'classnames';

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
                    let classes = classNames({
                        'gc-pending' : !booking.confirmed,
                        'gc-confirmed' : booking.confirmed,
                        'pull-right--t' : true
                    });
                        return (
                            <Panel key={i}>
                                <Col xs={12} sm={3}>
                                    <Image className="gc-booking-thumbnail" src={chefPic}/>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Row>
                                        <p className="gc-profile-text-md left-t">{chefName}</p>
                                    </Row>
                                    <Row>
                                    <div className="gc-bookingIcons-table">
                                        <div className="gc-booking-icon">
                                            <span className={'gc-icon gc-icon--' + (iconClass)}/><p className="gc-text-xs">{booking.type}</p>
                                        </div>
                                        <div className="gc-booking-icon">
                                            <span className="gc-icon gc-icon--people"/><p className="gc-text-xs">{booking.guests}</p>
                                        </div>
                                        <div className="gc-booking-icon">
                                            <span className="gc-icon gc-icon--money"/><p className="gc-text-xs">£{booking.budget}</p>
                                        </div>
                                    </div>
                                    </Row>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <p className="gc-profile-text-xs pull-right--t">{moment(booking.date).format('MMMM Do YYYY')}</p>
                                    <p className={classes}>{booking.confirmed ? 'Confirmed' : 'Pending'}</p>
                                </Col>
                            </Panel>
                        )
                    }) : <p className="gc-profile-text-sm ">You currently have no bookings</p>}
                {
            }
            </Col>
        )
    }
}

export default Bookings;
