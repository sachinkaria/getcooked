/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Col, Row } from 'react-bootstrap';
import renderField from '../components/forms/renderField';
import { contactChef } from '../actions/messages';
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

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleFormSubmit(formProps) {
        formProps._recipient = this.props.chefId;
        this.props.contactChef(formProps);
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

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <ButtonToolbar>
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
                    <Col xs={8} xsOffset={2}>
                        <Modal.Body>
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
                        </Modal.Body>
                    </Col>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { contactChef })(form(ContactForm));
