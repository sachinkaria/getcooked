import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';


function StepsColumn({ ...props }) {
  const style = classNames('gc-info-icon', {
    'gc-info-icon-sm': props.size === 'small'
  });

  return (
    <Col className="gc-margin-bottom--lg" xs={12} sm={props.columnWidth}>
      <Row>
        <Col xs={12} className="text-center">
          <img
            className={style}
            alt="Find a caterer"
            src={props.imageSrc}
          />
        </Col>
        <Col xs={12} className="gc-center">
          <h4 className="gc-profile-text-md gc-bold">
            {props.heading}
          </h4>
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