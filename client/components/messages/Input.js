/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Col, Row } from 'react-bootstrap';
import renderField from '../forms/renderField';
import { sendMessage } from '../../actions/messages';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

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

class ConversationInput extends React.Component {
    constructor(props) {
        super(props);
    }

    handleFormSubmit(formProps) {
        this.props.sendMessage({_conversationId: this.props.conversationId, body: formProps.body});
    }

    renderAlert() {
        if(this.props.errorMessage) {
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
                    <Col xs={8} xsOffset={2}>
                            <Row>
                                <Col sm={8} smOffset={2} md={4} mdOffset={4}>
                                    <h4 className="gc-profile-heading-md gc-center">Enter a message</h4>
                                    <br />
                                    <br />
                                    <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                                        {this.renderAlert()}
                                        <Row>
                                            <Col>
                                                <Field name="body" placeholder="Enter message" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
                                            </Col>
                                        </Row>
                                        <Button type="submit" bsSize="large" className="btn gc-btn gc-btn--orange">Register</Button>
                                    </form>
                                </Col>
                            </Row>
                    </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        conversation: state.user.conversation
    };
}

export default connect(mapStateToProps, { sendMessage })(form(ConversationInput));
