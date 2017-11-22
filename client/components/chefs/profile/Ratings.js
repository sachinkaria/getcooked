import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const Ratings = (props) => {
  const primaryColour = '#ff6851';
  const emptyStarColor = '#e4e2e2';
  return (
    <Row className="gc-center">
      <Col sm={6}>
        <p className="gc-text gc-bold gc-margin-none">Food</p>
        <StarRatingComponent
          editing={false}
          className="gc-star-rating"
          starColor={primaryColour}
          emptyStarColor={emptyStarColor}
          name="food"
          starCount={5}
          value={parseInt(props.ratings.food)}
          renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
        />
      </Col>
      <Col sm={6}>
        <p className="gc-text gc-bold gc-margin-none">Value</p>
        <StarRatingComponent
          editing={false}
          className="gc-star-rating"
          starColor={primaryColour}
          emptyStarColor={emptyStarColor}
          name="value"
          starCount={5}
          value={parseInt(props.ratings.value)}
        />
      </Col>
      <Col sm={6}>
        <p className="gc-text gc-bold gc-margin-none">Service</p>
        <StarRatingComponent
          editing={false}
          className="gc-star-rating"
          starColor={primaryColour}
          emptyStarColor={emptyStarColor}
          name="service"
          starCount={5}
          value={parseInt(props.ratings.service)}
        />
      </Col>
      <Col sm={6}>
        <p className="gc-text gc-bold gc-margin-none">Hygiene</p>
        <StarRatingComponent
          editing={false}
          className="gc-star-rating"
          starColor={primaryColour}
          emptyStarColor={emptyStarColor}
          name="hygiene"
          starCount={5}
          value={parseInt(props.ratings.hygiene)}
        />
      </Col>
    </Row>
  );
};

Ratings.propTypes = {
  ratings: React.PropTypes.shape({
    overall: React.PropTypes.Number,
    food: React.PropTypes.Number,
    service: React.PropTypes.Number,
    value: React.PropTypes.Number,
    hygiene: React.PropTypes.Number
  })
};

Ratings.defaultProps = {
  ratings: {}
};


export default Ratings;