import React from 'react';
import { Col } from 'react-bootstrap';

let Review = (props) => {
    return (
        <div>
            <Col xs={12}>
                <h4>{props.name}</h4>
                <p>{props.description}</p>
            </Col>
        </div>
    )
};

export default Review;
