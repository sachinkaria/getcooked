import React from 'react';

const Description = (props) => {
  return (
    <p className="gc-text">{props.description}</p>
  );
};

Description.propTypes = {
  description: React.PropTypes.string
};

Description.defaultProps = {
  description: 'No description was provided'
};


export default Description;