import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';


const Badge = props => (
  <Image className="gc-badge" src={props.logo} circle />
);


Badge.propTypes = {
  logo: PropTypes.string.isRequired
};

export default Badge;
