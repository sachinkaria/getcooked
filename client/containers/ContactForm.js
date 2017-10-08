/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Col, Row } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderInputBox from '../components/forms/renderInputBox';
import { createConversation } from '../actions/messages';

const form = reduxForm({
  form: 'contact',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.body) {
    errors.body = 'Please enter a message';
  }

  return errors;
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleFormSubmit(formProps) {
    formProps._recipient = this.props.chefId;
    this.props.createConversation(formProps);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Button className="gc-btn gc-btn--white" block onClick={this.showModal}>
          Contact
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title className="gc-profile-heading-md gc-center gc-margin-bottom">Enter a message</Modal.Title>
            <p className="gc-center gc-text gc-text--grey">Please fill out the details of your event. This is just a request and you will not be charged until the booking is confirmed and you are invoiced.</p>
          </Modal.Header>
          <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
            <Modal.Body>
              <Row>
                <Col>
                  <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <Row>
                      <Col>
                        <Field name="body" placeholder="Enter message" component={renderInputBox} type="text" />
                      </Col>
                    </Row>
                    <Button type="submit" className="btn gc-btn gc-btn--orange">Send Message</Button>
                  </form>
                </Col>
              </Row>
            </Modal.Body>
          </Col>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

ContactForm.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  chefId: PropTypes.string.isRequired,
  createConversation: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { createConversation })(form(ContactForm));
