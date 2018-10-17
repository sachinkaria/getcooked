/**
 * Created by sachinkaria on 14/09/2018.
 */
import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

function Message(props) {
  const {user, message, otherUser} = props;
  if (message._sender === user._id) {
    return (
      <li className="thread-item">
        {
          message.attachment ?
            <div className="my-message text-center">
              <Link href={message.body} target="_blank">
                <img
                  className="gc-icon gc-icon--md"
                  alt="location"
                  src="/images/icon-attachment.png"
                />
                <br />
                <span className="gc-text gc-text--lg gc-white inline-block">View File</span>
              </Link>
            </div>
            :
            <div className="my-message">
              {message.body}
            </div>
        }
        <div className="message-data">
          <span className="message-data-time pull-left">{moment(message.date).format('hh:mm, Do MMMM')}, <span
            className="text-capitalize">{message.status || 'read'}</span></span>
        </div>
        <span
          className="gc-message-thumbnail--me"
          style={{
            backgroundImage: `url(${user.profilePhoto || '/images/default_profile.png'})`,
            backgroundSize: 'cover'
          }}
        />
      </li>
    );
  } else {
    return (
      <li className="thread-item clearfix">
        <span
          className="gc-message-thumbnail"
          style={{
            backgroundImage: `url(${otherUser.profilePhoto || '/images/default_profile.png'})`,
            backgroundSize: 'cover'
          }}
        />
        {
          message.attachment ?
            <div className="message other-message text-center">
              <Link href={message.body} target="_blank">
                <img
                  className="gc-icon gc-icon--md"
                  alt="location"
                  src="/images/icon-attachment.png"
                />
                <br />
                <span className="gc-text gc-text--lg gc-orange inline-block">View File</span>
              </Link>
            </div>
            :
            <div className="message other-message pull-left">
              {message.body}
            </div>
        }
        <div className="message-data">
          <span
            className="message-data-time pull-right">{moment(message.date).format('hh:mm, Do MMMM')}</span> &nbsp; &nbsp;
        </div>
      </li>
    );
  }
}

export default Message;