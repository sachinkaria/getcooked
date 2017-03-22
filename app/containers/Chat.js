/**
 * Created by sachinkaria on 18/03/2017.
 */
let React = require('react');
let Messages = require('../components/Messages');
let ChatInput = require('./ChatInput');
let Col = require('react-bootstrap').Col;
let data = require('../utils/currentUser').data[0].inbox;
let helpers = require('../utils/helpers');



class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount (){
        let messages = helpers.getData(this.props.params.id, data)[0].chatMessages;
    this.setState({
        messages: messages
    })
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
