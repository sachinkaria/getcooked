import React from 'react';
import classNames from 'classnames';

const Heading = (props) => {
  const classes = classNames('gc-profile-heading-lg gc-margin-top--xs text-capitalize', {
    'gc-center': !props.textAlign
  });
  return <h1 className={classes}>{props.text}</h1>;
};

Heading.propTypes = {
  text: React.PropTypes.string.isRequired,
  textAlign: React.PropTypes.string
};

Heading.defaultProps = {
  text: '',
  textAlign: null
};


export default Heading;