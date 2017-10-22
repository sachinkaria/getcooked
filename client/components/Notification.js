import React from 'react';
import PropTypes from 'prop-types';


const Notifications = props => (
  <div className="gc-notification gc-margin-bottom--sm">
    <p className="gc-text gc-margin-none">{props.text}</p>
  </div>
);


Notifications.propTypes = {
  text: PropTypes.string.isRequired
};

export default Notifications;
