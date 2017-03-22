/**
 * Created by sachinkaria on 18/03/2017.
 */
let React = require('react');
let Messages = require('../components/Messages');
let ChatInput = require('./ChatInput');
let Col = require('react-bootstrap').Col;


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: this.props.chatMessages};

        this.sendMessage = this.sendMessage.bind(this);
    }


    sendMessage(message) {
        const messageObject = {
            created: new Date(),
            fromMe: true,
            message: message,
            username: 'Sachin K'
        };

        const messages = this.state.messages;
        messages.push(messageObject);
        this.setState({ messages });

    }

    render() {
        return (
            <div className="container">
                <h3>Messages</h3>
                <Col xs={8}>
                    <Messages messages={this.state.messages} />
                    <ChatInput onSend={this.sendMessage} />
                </Col>
            </div>
        );
    }

}

module.exports = Chat;
