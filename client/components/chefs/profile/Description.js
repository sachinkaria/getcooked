import React from 'react';

const Description = (props) => {
  return (
    <div>
      <h4 className="gc-text gc-profile-heading-md">What we're about...</h4>
      {
        props.description.map(paragraph => <p key={paragraph} className="gc-text gc-text--lg gc-margin-bottom">{paragraph}</p>)
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