import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-progressbar.js';


const containerStyle = {
  height: '50px'
};

const options = {
  strokeWidth: 1,
  easing: 'easeInOut',
  duration: 1400,
  color: 'rgba(34, 85, 96, 1)',
  trailColor: '#eee',
  trailWidth: 0.2
};

const ProgressBar = props => (
  <Line
    options={options}
    containerStyle={containerStyle}
    progress={props.progress}
  />
);


ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired
};

export default ProgressBar;
