import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <Row className="gc-section gc-section--footer text-center">
      <Col sm={8} smOffset={2}>
        <Row>
          <Col sm={4}>
            <li className="gc-list">
              <ul className="gc-text gc-white gc-padding-none">
                Terms and Conditions
              </ul>
              <ul className="gc-text gc-white gc-padding-none">
                Privacy Policy
              </ul>
            </li>
          </Col>
          <Col sm={4}>
            <li className="gc-list">
              <ul className="gc-text gc-white gc-padding-none">
                <a className="gc-link-default gc-link-default--white" rel="noopener noreferrer" target="_blank" href="http://facebook.com/getcookedapp">Facebook</a>
              </ul>
              <ul className="gc-text gc-white gc-padding-none">
                <a className="gc-link-default gc-link-default--white" rel="noopener noreferrer" target="_blank" href="http://instagram.com/getcookedapp">Instagram</a>
              </ul>
              <ul className="gc-text gc-white gc-padding-none">
                <a className="gc-link-default gc-link-default--white" rel="noopener noreferrer" target="_blank" href="http://twitter.com/getcookedapp">Twitter</a>
              </ul>
            </li>
          </Col>
          <Col sm={4}>
            <li className="gc-list">
              <ul className="gc-text gc-white gc-padding-none">
                <a className="gc-link-default gc-link-default--white" href="mailto:team@getcooked.co?Subject=Website%20Enquiry" target="_top">Contact Us</a>
              </ul>
              <ul className="gc-text gc-white gc-padding-none">
                Blog (coming soon)
              </ul>
            </li>
          </Col>
        </Row>
        <br />
        <Row>
          <Col className="text-center">
            <p className="gc-text gc-white">
              &copy; Get Cooked Ltd. All rights reserved.
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
