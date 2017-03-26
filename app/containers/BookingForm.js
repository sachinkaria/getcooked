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
                <Button bsStyle="success" className="gc-button" block onClick={this.showModal}>
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
