import React from 'react';
import classNames from 'classnames';

const Heading = (props) => {
  const classes = classNames({
    'gc-center': !props.textAlign,
    'gc-profile-heading-md': true,
    'gc-margin-bottom': true,
    'gc-green': true
  });
  return <p className={classes}>{props.text}</p>;
};

Heading.propTypes = {
  text: React.PropTypes.string.isRequired,
  textAlign: React.PropTypes.string
};

Heading.defaultProps = {
  text: ''
};


export default Heading;