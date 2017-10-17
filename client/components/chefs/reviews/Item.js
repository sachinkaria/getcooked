import React from 'react';
import { Col } from 'react-bootstrap';

const ReviewItem = props => (
  <div>
    <Col xs={12}>
      <h4>{props.name}</h4>
      <p>{props.description}</p>
    </Col>
  </div>
);

ReviewItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};

ReviewItem.defaultProps = {
  name: 'Unknown',
  description: 'Unknown description'
};

export default ReviewItem;
