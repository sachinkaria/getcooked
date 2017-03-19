/**
 * Created by sachinkaria on 19/03/2017.
 */
let React = require('react');
let currentUser = require('../utils/currentUser').data[0];
let Col = require('react-bootstrap').Col;
let Chat = require('./Chat');

let Inbox = React.createClass({
    render: function(){
        // console.log(currentUser);
        let chat = currentUser.inbox[0].chatMessages;
        return (
            <div>
            <Col xs={10} sm={8} smOffset={2}>
                <Col xs={8}>
                    <Chat chatMessages={chat} />
                </Col>
            </Col>
            </div>
        )
    }
});

module.exports = Inbox;

