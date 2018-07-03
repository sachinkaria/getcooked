import React from 'react';

const Description = (props) => {
  return (
    <div>
      {
        props.description.map(paragraph => <p key={paragraph} className="gc-text gc-text--slim gc-margin-bottom">{paragraph}</p>)
      }
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