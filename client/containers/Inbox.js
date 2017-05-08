/**
 * Created by sachinkaria on 19/03/2017.
 */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router';
import * as actions from '../actions';
import { connect } from 'react-redux';


class Inbox extends React.Component{
    constructor(props) {
        super(props);
        this.props.getInbox();
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
    renderContent() {
        let chats = this.props.inbox;
        return (
            <Col xs={10} sm={8} smOffset={2}>
                <h3 className="gc-profile-heading-lg">Inbox</h3>
                <Col xs={8}>
                    {chats.length > 0 ? chats.map(function(chat){
                        return (
                            <Link key={chat.id} to={'/chat/' + chat.id }>
                                <Row>
                                    <h1 className="gc-profile-heading-sm">{chat.username}</h1>
                                    <p className="gc-profile-text-xs">{_.last(chat.chatMessages).message}</p>
                                </Row>
                            </Link>
                        )
                    }) : (<p>You have no messages</p>)
                    }
                </Col>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return { inbox: state.auth.inbox };
}

export default connect(mapStateToProps, actions)(Inbox);

