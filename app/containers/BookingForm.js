/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';
import currentUser from '../utils/currentUser';

export default class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chefID: this.props.id, show: false, guests: '', type: '', info: '', date: null, confirmed: false, budget: null};
        this.baseState = this.state;
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            console.log(this.state);
            this.resetForm();
    }

    setDate(date) {
        this.setState({date});
    }

    resetForm(){
        this.setState(this.baseState);
    }

    render() {
        return (
            <ButtonToolbar>
                <Button className="gc-btn-search" block onClick={this.showModal}>
                   Make a booking
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="gc-profile-text-md">Make a booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form horizontal>
                                <Col sm={4}>
                                    Select a date
                                </Col>
                                <Col sm={8}>
                                    <DatePicker name="date" onChange={this.setDate} />
                                </Col>
                                <hr/>
                                    <Col sm={4}>
                                        Number of people
                                    </Col>
                                    <Col sm={8}>
                                        <FormGroup controlId="formControlsSelect">
                                            <FormControl name="guests" componentClass="select" onChange={this.handleChange} value={this.state.guests} placeholder="Number of guests">
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
                                    Event type
                                </Col>
                                <Col sm={8}>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl name="type" componentClass="select" onChange={this.handleChange} value={this.state.type} placeholder="Event type">
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
                                    Budget
                                </Col>
                                <Col sm={8}>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl
                                            block
                                            name="budget"
                                            type="number"
                                            value={this.state.budget}
                                            onChange={this.handleChange}
                                            placeholder="Enter budget" />
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    Additional Information
                                </Col>
                                <Col sm={8}>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl
                                            name="info"
                                            componentClass="textarea"
                                            bsClass="gc-input-box"
                                            value={this.state.info}
                                            onChange={this.handleChange}
                                            placeholder="Provide additional information or any special requirements that may be needed e.g vegetarian, dinner for two, 3 course set menu..." />
                                    </FormGroup>
                                </Col>
                                <Col xs={4} xsOffset={4}>
                                    <Button className="gc-btn-search"  onClick={this.handleSubmit} block>Submit Booking</Button>
                                </Col>
                            </Form>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }

}
