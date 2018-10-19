/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

function CoreDetails({ ...props }) {
  const PENDING = props.status !== ('pending' || 'declined');
  return (
    <Row>
      <Col xs={12} className="gc-margin-bottom--xs">
        {
          PENDING &&
            <div>
              <img
                className="gc-icon"
                alt="location"
                src="/images/phone-grey.png"
              />
              <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                <span>{props.mobileNumber || 'Not provided'}</span>
              </p>
            </div>
        }
      </Col>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          className="gc-icon"
          alt="location"
          src="/images/location-grey.png"
        />
        <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
          {props.address.line1}, <span>{_.toUpper(props.address.postcode)}</span>
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
      {
        (props.startTime && props.endTime) &&
        <Col xs={12} className="gc-margin-bottom--xs">
          <img
            className="gc-icon"
            alt="budget"
            src="/images/clock-grey.png"
          />
          <p className="gc-text gc-text--lg gc-inline-block">{moment(props.startTime).format('HH:mm')} to {moment(props.endTime).format('HH:mm')}</p>
        </Col>
      }
    </Row>
  );
}


CoreDetails.propTypes = {
  address: PropTypes.object.isRequired,
  numberOfPeople: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired
};

export default CoreDetails;
