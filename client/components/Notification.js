import React from 'react';

const Notifications = props => (
  <div className="gc-notification gc-margin-bottom--sm">
    <p className="gc-text gc-margin-none">{props.text}</p>
    {props.children && props.children}
  </div>
);


Notifications.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default Notifications;
