import React from 'react';

const Description = (props) => {
  return (
    <div className="text-left">
      <label className="gc-text gc-profile-heading-md gc-margin-bottom">Suppliers & Sources</label>
      {
        props.sources.map(source =>
          (
            <div key={source.name}>
              <h4 className="gc-text gc-text--lg gc-bold">{source.name}</h4>
              <p className="gc-text gc-text--lg gc-margin-bottom">{source.description}</p>
            </div>
          )
        )
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