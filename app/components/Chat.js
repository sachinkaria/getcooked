/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';

import Messages from './Messages';
import ChatInput from './ChatInput';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    sendHandler(message) {
        const messageObject = {
            username: this.props.username,
            message
        };

        // Emit the message to the server
        this.socket.emit('client:message', messageObject);

        messageObject.fromMe = true;
        this.addMessage(messageObject);
    }

    addMessage(message) {
        // Append the message to the component state
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
    }

    render() {
        return (
            <div className="container">
                <h3>React Chat App</h3>
                <Messages messages={this.state.messages} />
                <ChatInput onSend={this.sendHandler} />
            </div>
        );
    }

}
ChatApp.defaultProps = {
    username: 'Anonymous'
};

export default ChatApp;
