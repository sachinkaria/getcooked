/**
 * Created by sachinkaria on 19/03/2017.
 */
import React from 'react';
import { FormGroup, FormControl, Col, Button, Form } from 'react-bootstrap';


export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatInput: '' };

        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.state.chatInput.length > 0 && this.props.onSend(this.state.chatInput);

        this.setState({ chatInput: '' });
    }


    textChangeHandler(event)  {
        this.setState({ chatInput: event.target.value });
    }

    render() {
        return (
            <Form horizontal >
                <FormGroup onSubmit={this.handleChange}>
                    <Col xs={10}>
                        <FormControl
                            bsClass='chat-input'
                                type='text'
                               onChange={this.textChangeHandler}
                               value={this.state.chatInput}
                               placeholder='Write a message...'
                               required />
                     </Col>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.handleChange}>
                        Send
                    </Button>
                </FormGroup>
            </Form>

        );
    }
}