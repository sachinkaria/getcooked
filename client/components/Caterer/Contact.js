import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

function Contact() {
  return (
    <section className="gc-section gc-section--grey">
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <Panel className="gc-panel gc-panel--alert">
            <Panel.Body>
              <h2 className="gc-section-heading">
                FAQs and Contact Us
              </h2>
              <p className="gc-text gc-text--lg">
                If you are still unsure about our services please feel free to drop us an <a className="gc-link-default" href="mailto:team@getcooked.co?Subject=Website%20Enquiry" target="_top">team@getcooked.co</a>. Alternatively you can
                ask us any questions via chat or check out our <a className="gc-link-default" rel="noopener noreferrer" target="_blank" href="https://intercom.help/get-cooked/faqs-caterers">FAQs</a>.
              </p>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    </section>
  );
}

export default Contact;

