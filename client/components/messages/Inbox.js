/**
 * Created by sachinkaria on 19/03/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../../actions/messages';
import MessageItem from './Item';


class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.props.getConversations();
  }


  renderContent() {
    if (this.props.inbox.length) {
      const conversations = this.props.inbox;
      const currentUser = JSON.parse(localStorage.user);
      return (
        <Row>
          <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
            <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Messages</h3>
            {conversations.map((conversation) => {
              const recipient = conversation._sender._id === currentUser._id ? conversation._recipient : conversation._sender;
              return (
                <MessageItem
                  key={conversation._id}
                  id={conversation._id}
                  profilePhoto={recipient.profilePhoto}
                  displayName={recipient.displayName || recipient.firstName}
                  lastUpdated={conversation.lastUpdated}
                  lastMessage={_.last(conversation.messages)}
                />
              );
            })
            }
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col xs={8} xsOffset={2} sm={3} smOffset={5}>
          <p className="gc-profile-text-md">You have no messages</p>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Inbox.propTypes = {
  inbox: PropTypes.array.isRequired,
  getConversations: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { inbox: state.user.inbox };
}

export default connect(mapStateToProps, actions)(Inbox);

