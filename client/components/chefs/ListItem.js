import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

const StarRatingComponent = require('react-star-rating-component');

const ListItem = (props) => {
  const primaryColour = '#ff6851';
  const styles = {
    backgroundImage: `url(${props.profilePhoto})`,
  };

  return (
    <Col xs={12} sm={4} md={props.isHome ? 4 : 3} className="gc-profile-wrapper">
      <Link to={`/chefs/${props.id}`}>
        <Thumbnail className="gc-profile-thumbnail img-responsive" style={styles} />
        <div className="gc-profile-infobox">
          <h3 className="gc-profile-heading-sm gc-margin-left-xs gc-pull-left gc-clear-left">{props.name}</h3>
          <StarRatingComponent
            className="gc-margin-left-xs gc-pull-left gc-clear-left"
            starCount={5}
            value={props.rating}
            starColor={primaryColour}
            emptyStarColor={'#cecccc'}
            name={'rating'}
          /><span className="gc-grey gc-ratings-text">{props.numberOfReviews ? '(' + props.numberOfReviews + ')' : 'No reviews'}</span>
        </div>
      </Link>
    </Col>
  );
};

ListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  isHome: React.PropTypes.bool,
  profilePhoto: React.PropTypes.string.isRequired
};

ListItem.defaultProps = {
  numberOfRatings: null,
  isHome: false
};

export default ListItem;
