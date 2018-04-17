import React from 'react';
import classNames from 'classnames';

const Heading = (props) => {
  const classes = classNames('gc-profile-heading-md gc-margin-bottom gc-green text-capitalize', {
    'gc-center': !props.textAlign
  });
  return <p className={classes}>{props.text}</p>;
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