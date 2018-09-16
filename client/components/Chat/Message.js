/**
 * Created by sachinkaria on 14/09/2018.
 */
import React from 'react';
import moment from 'moment';

function Message(props) {
  const { user, message, otherUser } = props;
  if(message._sender === user._id) {
    return (
    <li className="thread-item">
      <div className="my-message gc-text gc-text--sm">
        {message.body}
      </div>
      <div className="message-data">
        <span className="message-data-time pull-left">{moment(message.date).format('hh:mm, Do MMMM')}</span>
      </div>
      <span className="gc-message-thumbnail--me" style={{ backgroundImage: `url(${user.profilePhoto || '/images/default_profile.png'})`, backgroundSize: 'cover' }} />
    </li>
    );
  } else {
    return (
      <li className="thread-item clearfix">
        <span className="gc-message-thumbnail" style={{ backgroundImage: `url(${otherUser.profilePhoto})`, backgroundSize: 'cover' }} />
        <div className="message other-message pull-left">
          {message.body}
        </div>
        <div className="message-data">
          <span className="message-data-time pull-right">{moment(message.date).format('hh:mm, Do MMMM')}</span> &nbsp; &nbsp;
        </div>
      </li>
    );
  }
}

export default Message;