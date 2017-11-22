import React from 'react';

const Description = (props) => {
  return (
    <div className="gc-center">
      <p className="gc-text gc-text--slim">{props.description}</p>
    </div>
  );
};

Description.propTypes = {
  description: React.PropTypes.string
};

Description.defaultProps = {
  description: 'No description was provided'
};


export default Description;