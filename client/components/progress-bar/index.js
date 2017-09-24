import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-progressbar.js';


const containerStyle = {
  height: '50px'
};

const options = {
  strokeWidth: 2,
  easing: 'easeInOut',
  duration: 1400,
  color: '#ff6851',
  trailColor: '#eee',
  trailWidth: 1
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
