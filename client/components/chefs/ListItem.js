import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

const StarRatingComponent = require('react-star-rating-component');

const ListItem = (props) => {
  const primaryColour = '#ff6851';
  const styles = {
    backgroundImage: `url(${props.profilePhoto})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top'
  };

  return (
    <Col xs={12} sm={4} md={props.isHome ? 4 : 3} className="gc-profile-wrapper">
      <Link to={`/chefs/${props.id}`}>
        <Thumbnail className="gc-profile-thumbnail img-responsive" style={styles} />
        <div className="gc-profile-infobox">
          <h3 className="gc-profile-heading-sm gc-pull-left gc-margin-bottom--xs">{props.name}</h3>
          <p className="gc-profile-text-xs gc-clear-left">{props.tagLine}</p>
          <div className="gc-position-bottom">
            <StarRatingComponent
              className="gc-pull-left"
              starCount={5}
              value={props.rating}
              starColor={primaryColour}
              emptyStarColor={'#cecccc'}
              name={'rating'}
            /><span className="gc-grey gc-ratings-text">{props.numberOfReviews ? '(' + props.numberOfReviews + ')' : 'No reviews'}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

ListItem.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  tagLine: React.PropTypes.string.isRequired,
  isHome: React.PropTypes.bool,
  profilePhoto: React.PropTypes.string.isRequired
};

ListItem.defaultProps = {
  numberOfRatings: null,
  isHome: false
};

export default ListItem;
