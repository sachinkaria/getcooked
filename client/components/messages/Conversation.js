/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import Message from './Message';
import ChatInput from './Input';
import * as actions from '../../actions/messages';


class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.props.getConversation(props.params.id);
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  renderContent() {
    if (this.props.conversation) {
      const currentUser = JSON.parse(localStorage.user);
      const messages = this.props.conversation;
      return (
        <div>
          <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <Link to="/inbox" className="gc-profile-heading-sm gc-margin-bottom--lg">&larr; Messages</Link>
            <Panel className="message-box gc-margin-top--lg" id="messageList">
              {messages.map(message => (
                <div key={message._id}>
                  <Message
                    image={message._sender.profilePhoto}
                    username={message._sender.displayName || message._sender.firstName}
                    message={message.body}
                    fromMe={currentUser._id === message._sender._id}
                    date={message.date}
                    status={message.status}
                  />
                </div>
              ))
              }
            </Panel>
            <ChatInput conversationId={this.props.params.id} />
          </Col>
        </div>
      );
    }
    return (<p className="gc-profile-text-md">You have no messages</p>);
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Conversation.propTypes = {
  params: PropTypes.object.isRequired,
  getConversation: PropTypes.func.isRequired,
  conversation: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    conversation: state.user.conversation
  };
}

export default connect(mapStateToProps, actions)(Conversation);
