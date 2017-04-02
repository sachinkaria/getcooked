/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, Row, ControlLabel, InputGroup } from 'react-bootstrap';
import DatePicker from './DatePicker';
import currentUser from '../utils/currentUser';

export default class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chefID: this.props.id, show: false, guests: '', type: '', info: '', date: null, confirmed: false, budget: '', errorMessage: ''};
        this.baseState = this.state;

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.setDate = this.setDate.bind(this);

    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.resetForm();
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
            currentUser.bookings.push(this.state);
            this.resetForm();
    }

    handleEmptySubmit (event) {
        event.preventDefault();
        this.setState({
            errorMessage: 'Please complete all the fields before submitting your booking request.'
        })
    }
    setDate(date) {
        this.setState({date});
    }

    resetForm(){
        this.setState(this.baseState);
    }

    render() {
        const submitHandler = (this.state.chefID && this.state.guests && this.state.date && this.state.budget) ? this.handleSubmit : this.handleEmptySubmit;
        return (
            <ButtonToolbar>
                <Button className="gc-btn-orange" block onClick={this.showModal}>
                  Request to book
                </Button>
                    <Modal
                        {...this.props}
                        show={this.state.show}
                        onHide={this.hideModal}
                        dialogClassName="custom-modal"
                        bsSize="large"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title className="gc-profile-heading-md gc-center gc-margin-bottom">Request to book</Modal.Title>
                            <p className="gc-center gc-text-xs">Please fill out the details of your event. This is just a request and you will not be charged until the booking is confirmed and you are invoiced.</p>
                        </Modal.Header>
                        <Col xs={8} xsOffset={2}>
                        <Modal.Body>
                            <Row>
                                <Form inline>
                                    <Col sm={4}>
                                        <ControlLabel className="gc-form-label">Date of event</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <DatePicker name="date" onChange={this.setDate} />
                                    </Col>
                                    <Col sm={4}>
                                        <ControlLabel className="gc-form-label">Number of people</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <FormGroup controlId="formControlsSelect">
                                            <FormControl bsClass="gc-input gc-margin-bottom"  name="guests" componentClass="select" onChange={this.handleChange} value={this.state.guests} placeholder="Number of guests">
                                                <option value="">Select</option>
                                                <option value="0-10">0-10</option>
                                                <option value="10-20">10-20</option>
                                                <option value="20-50">20-50</option>
                                                <option value="50-10">50-100</option>
                                                <option value="100-200">100-200</option>
                                                <option value="200-500">200-500</option>
                                                <option value="500+">500+</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <ControlLabel className="gc-form-label">Type of event</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <FormGroup controlId="formControlsSelect">
                                            <FormControl bsClass="gc-input gc-margin-bottom" name="type" componentClass="select" onChange={this.handleChange} value={this.state.type} placeholder="Event type">
                                                <option value="">Select</option>
                                                <option value="Private Dinner">Private Dinner</option>
                                                <option value="Wedding">Wedding</option>
                                                <option value="Private Party">Private Party</option>
                                                <option value="Public Event">Public Event</option>
                                                <option value="Festival">Festival</option>
                                                <option value="Corporate Event">Corporate Event</option>
                                                <option value="BBQ">BBQ</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <ControlLabel className="gc-form-label">Budget</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                            <FormGroup controlId="formControlsSelect">
                                                <InputGroup className="gc-margin-bottom">
                                                    <InputGroup.Addon>£</InputGroup.Addon>
                                                    <FormControl
                                                        bsClass="gc-input gc-input-addon"
                                                        name="budget"
                                                        type="number"
                                                        value={this.state.budget}
                                                        onChange={this.handleChange}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    <Col sm={4}>
                                        <ControlLabel className="gc-form-label">Additional information</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <FormGroup bsClass="full-width" controlId="formControlsSelect">
                                            <FormControl
                                                name="info"
                                                componentClass="textarea"
                                                bsClass="gc-input gc-input-box gc-margin-bottom"
                                                value={this.state.info}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={4} xsOffset={4}>
                                        <Button bsSize="large" className="gc-btn-orange" onClick={submitHandler} block >Submit request</Button>
                                        {this.state.errorMessage &&
                                            <span>{this.state.errorMessage}</span>}
                                    </Col>
                                </Form>
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
