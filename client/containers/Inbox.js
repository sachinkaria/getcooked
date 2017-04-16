/**
 * Created by sachinkaria on 19/03/2017.
 */
import React from 'react';
import userData from '../utils/currentUser';
import { Col, Row } from 'react-bootstrap';
import _ from 'lodash';
import { ReactRouter, Link } from 'react-router';

let Inbox = React.createClass({
    render: function(){
        let chats = userData.inbox;
        return (
            <Col xs={10} sm={8} smOffset={2}>
                <h3 className="gc-profile-heading-lg">Inbox</h3>
                <Col xs={8}>
                    {chats.map(function(chat){
                        return (
                            <Link key={chat.id} to={'/chat/' + chat.id }>
                                <Row>
                                    <h1 className="gc-profile-heading-sm">{chat.username}</h1>
                                    <p className="gc-profile-text-xs">{_.last(chat.chatMessages).message}</p>
                                </Row>
                            </Link>
                        )
                    })
                    }
                </Col>
            </Col>
        )
    }
});

export default Inbox;

