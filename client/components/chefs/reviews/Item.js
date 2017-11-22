import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

const ReviewItem = props => (
  <Row className="text-left">
    <Col sm={3}>
      <p className="gc-text gc-margin-none">{props.name}</p>
      <p className="gc-text gc-bold gc-grey gc-profile-text-sm">{moment(props.date).format('Do MMM YYYY')} </p>
    </Col>
    <Col sm={9}>
      <p className="gc-text gc-text--slim">{props.description}</p>
    </Col>
  </Row>
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
