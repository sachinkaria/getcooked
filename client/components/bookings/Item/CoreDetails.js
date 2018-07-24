/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

function CoreDetails({ ...props }) {
  return (
    <Row>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          className="gc-icon"
          alt="location"
          src="/images/location-grey.png"
        />
        <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
          {props.address.line1}, {props.address.postcode}
        </p>
      </Col>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          className="gc-icon"
          alt="people"
          src="/images/people-grey.png"
        />
        <p className="gc-text gc-text--lg gc-inline-block">{props.numberOfPeople} people</p>
      </Col>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          className="gc-icon"
          alt="budget"
          src="/images/money-grey.png"
        />
        <p className="gc-text gc-text--lg gc-inline-block">£{props.budget || 1500}</p>
      </Col>
    </Row>
  );
}


CoreDetails.propTypes = {
  address: PropTypes.object.isRequired,
  numberOfPeople: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired
};

export default CoreDetails;
