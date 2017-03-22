/**
 * Created by sachinkaria on 19/03/2017.
 */
let React = require('react');
let FormGroup = require('react-bootstrap').FormGroup;
let FormControl = require('react-bootstrap').FormControl;
let Col = require('react-bootstrap').Col;

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chatInput: '' };

        // React ES6 does not bind 'this' to event handlers by default
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // Stop the form from refreshing the page on submit
        event.preventDefault();
        // Call the onSend callback with the chatInput message
        this.props.onSend(this.state.chatInput);

        // Clear the input box
        this.setState({ chatInput: '' });

    }


    textChangeHandler(event)  {
        this.setState({ chatInput: event.target.value });
    }

    render() {
        return (
                <FormGroup onSubmit={this.handleChange}>
                    <FormControl
                        bsClass='chat-input'
                            type='text'
                           onChange={this.textChangeHandler}
                           value={this.state.chatInput}
                           placeholder='Write a message...'
                           required />
                </FormGroup>
        );
    }
}

module.exports = ChatInput;
