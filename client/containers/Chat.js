/**
 * Created by sachinkaria on 18/03/2017.
 */
import React from 'react';
import Conversation from '../components/Conversation';
import { Col } from 'react-bootstrap';



export default class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h3>Messages</h3>
                <Col xs={8}>
                    <Conversation />
                </Col>
            </div>
        );
    }

}
