/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import { Messages } from '../components/Messages';
import { ChatInput } from './ChatInput';
import { Col } from 'react-bootstrap';
import { data } from '../utils/currentUser';
import { helpers } from '../utils/helpers';



export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount (){
        let messages = helpers.getData(this.props.params.id, data).chatMessages;
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
