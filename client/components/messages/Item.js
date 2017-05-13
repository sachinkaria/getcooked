import React from 'react';
import { Link } from 'react-router';
import { Col, Panel, Image } from 'react-bootstrap';
import moment from 'moment';

const MessageItem = (props) => {
    return (
        <Link to={'/conversation/' + props.id } key={props._id}>
            <Panel>
                <Col xs={12} sm={3}>
                    <Image className="gc-thumbnail" src={props.profilePhoto}/>
                </Col>
                <Col sm={5}>
                    <p className="gc-profile-text-md">{props.displayName}</p>
                </Col>
                <Col xs={12} sm={4}>
                    <p className="gc-text pull-right--t">Last message: {moment(props.lastUpdated).format('MMMM Do YYYY')}</p>
                </Col>
            </Panel>
        </Link>
    )
};

export default MessageItem;
