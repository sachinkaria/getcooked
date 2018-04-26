import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { createEvent } from '../../actions/events';
import BookingForm from '../../containers/BookingForm';
import { MODAL } from '../../utils/data';

function GetQuote(props) {
  return (
    <section className="gc-section--main">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h1 className="gc-section-heading gc-center">Get Quotes</h1>
          <h4 className="gc-text gc-text--lg gc-text--grey gc-center">{MODAL.DESCRIPTION}</h4>
          <br />
          <BookingForm
            withoutChef
            onSubmit={props.createEvent}
            large
            action="Get Quotes"
            endRoute="/"
          />
        </Col>
      </Row>
    </section>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { createEvent })(GetQuote);
