import React from 'react';
import Message from './Message.js';
import MessageInput from '../../containers/forms/MessageInput';
import PropTypes from 'prop-types';

function Chat(props) {
  return (
    <div>
      <div className="chat-history">
        <ul style={{listStyle: 'none', paddingLeft: '0px', paddingRight: '0px', listStylePosition: 'inside'}}>
          {
            props.messages.map((message, i) => {
              return (
                <Message key={i} message={message} user={props.user} otherUser={props.otherUser} />
              );
            })
          }
        </ul>
      </div>
      {
       !props.disableInput &&
        <MessageInput disableInput={props.disableInput} onSubmit={props.onSubmit} />
      }
    </div>
  );
};


export default Chat;