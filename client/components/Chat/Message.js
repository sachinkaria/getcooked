/**
 * Created by sachinkaria on 14/09/2018.
 */
import React from 'react';
import moment from 'moment';

function Message(props) {
  const { user, message } = props;

  if(message._sender === user._id) {
    return (
      <li className="thread-item clearfix">
        <span className="gc-message-thumbnail" style={{ backgroundImage: `url(${user.profilePhoto})`, backgroundSize: 'cover' }} />
        <div className="message other-message pull-left">
          {message.body}
        </div>
        <div className="message-data">
          <span className="message-data-time pull-right">{moment(message.date).format('hh:mm, Do MMMM')}</span> &nbsp; &nbsp;
        </div>
      </li>
    );
  } else {
    return (
      <li className="thread-item">
        <div className="my-message gc-text gc-text--sm">
          {message.body}
        </div>
        <div className="message-data">
          <span className="message-data-time pull-left">{moment(message.date).format('hh:mm, Do MMMM')}</span>
        </div>
        <span className="gc-message-thumbnail" style={{ backgroundImage: `url(${user.profilePhoto})`, backgroundSize: 'cover' }} />
      </li>
    );
  }
}

export default Message;