import React from 'react';
import { PropTypes } from 'react';
import { Image, Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';
import classNames from 'classnames';

let BookingItem = (props) => {
    let classes = classNames({
        'gc-pending' : !props.booking.confirmed,
        'gc-confirmed' : props.booking.confirmed,
        'pull-right--t' : true
    });
    return (
        <Panel>
            <Col xs={12} sm={3}>
                <Image className="gc-booking-thumbnail" src={props.chefPic}/>
            </Col>
            <Col xs={12} sm={6}>
                <Row>
                    <p className="gc-profile-text-md left-t">{props.chefName}</p>
                </Row>
                <Row>
                    <div className="gc-bookingIcons-table">
                        <div className="gc-booking-icon">
                            <span className={'gc-icon gc-icon--' + (props.iconClass)}/><p className="gc-text-xs">{props.booking.type}</p>
                        </div>
                        <div className="gc-booking-icon">
                            <span className="gc-icon gc-icon--people"/><p className="gc-text-xs">{props.booking.guests}</p>
                        </div>
                        <div className="gc-booking-icon">
                            <span className="gc-icon gc-icon--money"/><p className="gc-text-xs">£{props.booking.budget}</p>
                        </div>
                    </div>
                </Row>
            </Col>
            <Col xs={12} sm={3}>
                <p className="gc-profile-text-xs pull-right--t">{moment(props.booking.date).format('MMMM Do YYYY')}</p>
                <p className={classes}>{props.booking.confirmed ? 'Confirmed' : 'Pending'}</p>
            </Col>
        </Panel>
    )
};

//
// Badge.propTypes = {
//     logo: PropTypes.string.isRequired
// };

export default BookingItem;
