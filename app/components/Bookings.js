/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import currentUser from '../utils/currentUser';
import { Col } from 'react-bootstrap';

class Bookings extends React.Component {
    render() {
        let bookings = currentUser.bookings;
        return (
            <Col xs={10}>
                {bookings.map(function(booking, i){
                    return (
                        <h1 key={i}>{booking.type}</h1>
                    )
                })
            }
            </Col>
        )
    }
}

export default Bookings;
