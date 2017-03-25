import React from 'react';
import { PropTypes } from 'react';
import { Image } from 'react-bootstrap';


let Badge = (props) => {
    return (
        <Image className="gc-badge" src={props.logo} circle />
    )
};


Badge.propTypes = {
    logo: PropTypes.string.isRequired
};

export default Badge;
