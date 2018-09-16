import React from 'react';
import {Link} from 'react-router';
import {Col, Panel, Image} from 'react-bootstrap';
import moment from 'moment';
import classNames from 'classnames';

const MessageItem = (props) => {
  const currentUser = JSON.parse(localStorage.user);
  const classes = classNames({
    'gc-text': true,
    'gc-bold': props.lastMessage.status === 'sent' && props.lastMessage._sender !== currentUser._id
  });
  return (
    <Link to={`/conversation/${props.id}`} key={props._id}>
      <Panel className="">
        <Col sm={3} className="gc-center">
          <Image className="gc-thumbnail" src={props.profilePhoto}/>
        </Col>
        <Col sm={9} className="gc-margin-top--sm">
          <Col sm={7} className="gc-center pull-left--t">
            <p
              className={props.lastMessage.status === 'sent' && props.lastMessage._sender !== currentUser._id ? 'gc-profile-text-sm gc-bold' : 'gc-profile-text-sm'}>{props.displayName || props.firstName}</p>
          </Col>
          <Col sm={5} className="gc-center pull-left--t">
            <p
              className={props.lastMessage.status === 'sent' && props.lastMessage._sender !== currentUser._id ? 'gc-text gc-bold' : 'gc-text'}>
              Last message: {moment(props.lastUpdated).format('MMMM Do YYYY')}</p>
          </Col>
          {props.lastMessage && (
            <Col sm={12} className="gc-margin-top gc-overflow-ellipsis">
              <p className={classes}>{props.lastMessage.body}</p>
            </Col>
          )}
        </Col>
      </Panel>
    </Link>
  );
};

export default MessageItem;
