import React from 'react';
import classNames from 'classnames';

const Status = (props) => {
  const classes = classNames('gc-text gc-text--xl gc-bold gc-inline-block--without-margin', {
    'gc-dark-yellow': props.status === 'pending',
    'gc-light-green': props.status === 'listed',
    'gc-red': props.status === 'unlisted'
  });
  return (
    <div>
      <span className={classes}>&#9679;</span><p className="gc-text gc-inline-block text-capitalize">{props.status}</p>
    </div>
  )
};

Status.propTypes = {
  text: React.PropTypes.string.isRequired
};

Status.defaultProps = {
  text: ''
};


export default Status;
