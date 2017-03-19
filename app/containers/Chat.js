/**
 * Created by sachinkaria on 18/03/2017.
 */
let React = require('react');
let Messages = require('../components/Messages');
let ChatInput = require('./ChatInput');


class Chat extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.state);
        this.state = {messages: this.props.chatMessages};
    }

    sendMessage(message) {
        this.state.messages.push(message);
    }

    render() {
        return (
            <div className="container">
                <h3>React Chat App</h3>
                <Messages messages={this.state.messages} />
                <ChatInput onSend={this.sendMessage} />
            </div>
        );
    }

}

module.exports = Chat;
