import React from 'react';
import { Col } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';


let Rating = (props) => {
    return (
        <div>
            <Col xs={12}>

                    <h4 className="gc-pull-left">{props.category}</h4>
                <StarRatingComponent
                    className="gc-rating"
                    starCount={5}
                    value={props.value}
                    starColor={'#e46344'}
                    emptyStarColor={'#cecccc'}
                    name={'rating'}/>
            </Col>
        </div>
    )
};

export default Rating;
