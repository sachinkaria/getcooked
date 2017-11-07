import React from 'react';
import renderField from '../components/forms/renderField';
import renderInputBox from '../components/forms/renderInputBox';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';
import { EVENTS } from '../utils/data';

const form = reduxForm({
  form: 'booking',
  fields: ['date', 'eventType']
});

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.baseState = this.state;

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  hideModal() {
    this.resetForm();
  }

  setDate(date) {
    this.setState({ date });
  }

  showModal() {
    this.setState({ show: true });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  render() {
    return (
      <div>
        <Button className="gc-btn gc-btn--orange" block onClick={this.showModal}>
                  Request to book
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title className="gc-profile-heading-md gc-center gc-margin-bottom">Request to book</Modal.Title>
            <p className="gc-center gc-text gc-text--grey">Please fill out the details of your event. This is just a request and you will not be charged until the booking is confirmed and you are invoiced.</p>
          </Modal.Header>
          <Col sm={6} smOffset={3}>
            <Modal.Body>
              <Row>
                <form>
                  <label className="gc-text">Date</label>
                  <div>
                    <DatePicker name="date" onChange={this.setDate} />
                  </div>
                  <label className="gc-text">Postcode</label>
                  <div className="gc-margin-bottom">
                    <Field
                      name="numberOfPeople"
                      placeholder="e.g. SW1A 1AA"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="number"
                    />
                  </div>
                  <label className="gc-text">Event Type</label>
                  <div className="gc-margin-bottom">
                    <Field
                      name="eventType"
                      className="form-control gc-input text-capitalize"
                      component="select"
                    >
                      {EVENTS.map(code =>
                        (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        )
                      )}
                    </Field>
                  </div>
                  <label className="gc-text">Number of people (approx.)</label>
                  <div className="gc-margin-bottom">
                    <Field
                      name="numberOfPeople"
                      placeholder="e.g. 200"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="number"
                    />
                  </div>
                  <label className="gc-text">Additional Information</label>
                  <div className="gc-margin-bottom">
                    <Field
                      name="additionalInformation"
                      placeholder="Please give any extra details about your event."
                      className="form-control gc-input gc-margin-bottom"
                      component={renderInputBox}
                      type="text"
                    />
                  </div>
                  <Col xs={10} xsOffset={1} sm={4} smOffset={4} >
                    <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
                      Save
                    </Button>
                  </Col>
                </form>
              </Row>
            </Modal.Body>
          </Col>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

export default form(BookingForm);
