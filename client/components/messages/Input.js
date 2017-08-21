/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendMessageUpdateConversation } from '../../actions/messages';


class ConversationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: '', conversationId: props.conversationId, errorMessage: '' };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleEmptySubmit(event) {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please enter a message.'
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState(
      {
        [name]: event.target.value
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.sendMessageUpdateConversation({ _conversationId: this.state.conversationId, body: this.state.body });
    this.resetForm();
  }

  resetForm() {
    this.setState(this.baseState);
  }

  renderAlert() {
    if (this.state.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.state.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const submitHandler = (this.state.body) ? this.handleSubmit : this.handleEmptySubmit;
    return (
      <Form className="gc-center" onSubmit={submitHandler}>
        {this.renderAlert()}
        <FormGroup controlId="body">
          <FormControl
            componentClass="textarea"
            bsClass="gc-input gc-input-box gc-margin-bottom"
            onChange={this.handleChange}
            value={this.state.body}
            type="text"
            name="body"
            placeholder="Enter message...."
          />
        </FormGroup>
        <Button
          type="submit"
          bsSize="large"
          className="btn gc-btn gc-btn--orange"
        >
          Send Message
        </Button>
      </Form>
    );
  }
}

ConversationInput.propTypes = {
  conversationId: PropTypes.string.isRequired,
  sendMessageUpdateConversation: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    conversation: state.user.conversation
  };
}

export default connect(mapStateToProps, { sendMessageUpdateConversation })((ConversationInput));
