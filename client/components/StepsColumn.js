import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';


function StepsColumn({...props}) {
  return (
    <Col className="gc-margin-bottom--lg" xs={12} sm={props.columnWidth}>
      <Row>
        <Col xs={12} className="text-center">
          <img
            className="gc-info-icon"
            alt="Find a caterer"
            src={props.imageSrc}
          />
        </Col>
        <Col xs={12} className="gc-center">
          <h3 className="gc-profile-text-md gc-bold">
            {props.heading}
          </h3>
          <p className="gc-text gc-text--lg">
            {props.text}
          </p>
        </Col>
      </Row>
    </Col>
  );
}

StepsColumn.PropTypes = {
  columnWidth: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired
};


export default StepsColumn;