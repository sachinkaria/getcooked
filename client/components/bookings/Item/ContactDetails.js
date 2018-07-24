/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

function ContactDetails(props) {
  return (
    <Row>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          alt="name"
          src="/images/contact-grey.png"
          className="gc-icon"
        />
        <p className="gc-text gc-text--lg text-capitalize gc-inline-block">{props.contactDetails.firstName}</p>
      </Col>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          alt="phone"
          src="/images/phone-grey.png"
          className="gc-icon"
        />
        <p className="gc-text gc-text--lg gc-inline-block"> {props.contactDetails.mobileNumber}</p>
      </Col>
      <Col xs={12} className="gc-margin-bottom--xs">
        <img
          alt="email"
          src="/images/letter-grey.png"
          className="gc-icon"
        />
        <p className="gc-text gc-text--lg gc-inline-block">{props.contactDetails.email}</p>
      </Col>
    </Row>
  );
}


ContactDetails.propTypes = {
  contactDetails: PropTypes.object.isRequired
};

export default ContactDetails;
