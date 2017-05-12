/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import Message from './Message';
import ChatInput from './Input';
import * as actions from '../../actions/messages';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';


class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.props.getConversation(props.params.id);
    }

    componentDidUpdate () {
        // There is a new message in the state, scroll to bottom of list
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }

    renderContent() {
        if (this.props.conversation) {
            let currentUser = JSON.parse(localStorage['user']);
            let messages = this.props.conversation;
            return (
                <div>
                    <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
                        <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Messages</h3>
                        <Panel className='message-box' id='messageList'>
                            {messages.map((message) => {
                                return (
                                    <div key={message._id}>
                                        <Message
                                            image={message._sender.profilePhoto}
                                            username={message._sender.displayName || message._sender.firstName}
                                            message={message.body}
                                            fromMe={currentUser._id === message._sender._id}
                                            date={message.date}/>
                                    </div>
                                )
                            })
                            }
                        </Panel>
                        <ChatInput conversationId={this.props.params.id} />
                    </Col>
                </div>
            )
        } else {
            return (<p className="gc-profile-text-md">You have no messages</p>)
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        conversation: state.user.conversation
    };
}

export default connect(mapStateToProps, actions)(Conversation);
