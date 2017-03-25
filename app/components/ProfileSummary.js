import React from 'react';
import { PropTypes } from 'react';
import { Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';
let StarRatingComponent = require('react-star-rating-component');

let ProfileSummary = (props) => {
    let styles = {
            backgroundImage: 'url(' + props.imageUrl + ')',
        };

    return (
            <Col xs={6} md={3}>
                <Link to={'/profile/' + props.id }>
                    <div>
                        <Thumbnail className='gc-profile-thumbnail img-responsive' style={ styles } />
                            <div className="gc-profile-infobox">
                                <h3 className="gc-profile-heading-sm gc-margin-left-xs gc-pull-left gc-clear-left">{props.name}</h3>
                                <StarRatingComponent
                                    className="gc-margin-left-xs gc-pull-left gc-clear-left"
                                    starCount={5}
                                    value={props.rating}
                                    starColor={'#e46344'}
                                    emptyStarColor={'#cecccc'}
                                    name={'rating'}
                                /><span className="gc-ratings-text">{props.numberOfRatings} reviews</span>
                            </div>
                    </div>
                </Link>
            </Col>
    )
};

ProfileSummary.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numberOfRatings: PropTypes.number.isRequired

};

export default ProfileSummary;