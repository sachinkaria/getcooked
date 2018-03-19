import React from 'react';
import { Circle } from 'react-progressbar.js';

const ProgressCircle = (props) => {
  const { width, height, color, progress, text } = props;

  const containerStyle = {
    height,
    width,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  const options = {
    strokeWidth: 8,
    easing: 'easeInOut',
    duration: 1000,
    color,
    trailColor: '#eee',
    trailWidth: 8
  };

  return (
    <Circle
      options={options}
      text={text}
      initialAnimate
      containerStyle={containerStyle}
      progress={progress}
    />
  );
};


ProgressCircle.propTypes = {
  progress: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  width: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired
};

export default ProgressCircle;
