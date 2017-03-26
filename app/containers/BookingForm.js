/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';


export default class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
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
                                    <DatePicker />
                                </Col>
                                <hr/>
                                    <Col sm={4}>
                                        Number of people
                                    </Col>
                                    <Col sm={8}>
                                        <FormGroup controlId="formControlsSelect">
                                            <FormControl componentClass="select" placeholder="Number of guests">
                                                <option value="select">0-10</option>
                                                <option value="select">10-20</option>
                                                <option value="select">20-50</option>
                                                <option value="select">50-100</option>
                                                <option value="select">100-200</option>
                                                <option value="select">200-500</option>
                                                <option value="select">500+</option>
                                            </FormControl>
                                        </FormGroup>
                                    </Col>
                                <Col sm={4}>
                                    Event type
                                </Col>
                                <Col sm={8}>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl componentClass="select" placeholder="Event type">
                                            <option value="select">Private Dinner</option>
                                            <option value="select">Wedding</option>
                                            <option value="select">Private Party</option>
                                            <option value="select">Public Event</option>
                                            <option value="select">Festival</option>
                                            <option value="select">Corporate Event</option>
                                            <option value="select">BBQ</option>
                                        </FormControl>
                                    </FormGroup>
                                </Col>
                                <Col sm={4}>
                                    Additional Information
                                </Col>
                                <Col sm={8}>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl componentClass="textarea" bsClass="gc-input-box" placeholder="Provide additional information or any special requirements that may be needed e.g vegetarian, dinner for two, 3 course set menu..." />
                                    </FormGroup>
                                </Col>
                                <Col xs={4} xsOffset={4}>
                                    <Button className="gc-btn-search"  onClick={this.hideModal} block>Submit Booking</Button>
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
