/**
 * Created by sachinkaria on 19/03/2017.
 */
let React = require('react');
let currentUser = require('../utils/currentUser').data[0];
let Col = require('react-bootstrap').Col;
let Row = require('react-bootstrap').Row;
let _ = require('lodash');
let ReactRouter = require('react-router');
let Link = ReactRouter.Link;

let Inbox = React.createClass({
    render: function(){
        let chats = currentUser.inbox;
        return (
            <Col xs={10} sm={8} smOffset={2}>
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

module.exports = Inbox;

