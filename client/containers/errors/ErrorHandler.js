import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

const ErrorHandler = (props) => {
  const classes = classNames('gc-error', {
    'gc-slide-down': props.error
  });
  return (
    props.error &&
    <div className={classes}>
      <p className="gc-text gc-white">
        {props.error}
      </p>
    </div>
  );
};

ErrorHandler.propTypes = {
  error: React.PropTypes.string
};

ErrorHandler.defaultProps = {
  error: null
};

function mapStateToProps(state) {
  return { error: state.auth.error };
}

export default connect(mapStateToProps, null)(ErrorHandler);
