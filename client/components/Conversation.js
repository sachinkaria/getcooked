/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import Message from './Message';
import * as actions from '../actions/messages';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';


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
            let messages = this.props.conversation;
            return (
                <div>
                    <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
                        <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Messages</h3>
                        <div className='messages' id='messageList'>
                            {messages.map((message) => {
                                return (
                                    <div key={message._id}>
                                        <Message
                                            username={message._sender.displayName || message._sender.firstName}
                                            message={message.body}
                                            fromMe={true}
                                            date={message.date}/>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </Col>
                </div>
            )
        } else {
            return (<p className="gc-profile-text-md">You have no messages</p>)
        }
    }
}

function mapStateToProps(state) {
    return { conversation: state.user.conversation };
}

export default connect(mapStateToProps, actions)(Conversation);
