import React from 'react';

const Description = (props) => {
  return (
    <div>
      <label className="gc-text gc-margin-bottom gc-form-heading gc-bold">Suppliers & Sources</label>
      {
        props.sources.map(source =>
          (
            <div key={source.name}>
              <h4 className="gc-text gc-bold">{source.name}</h4>
              <p className="gc-text gc-text--slim gc-margin-bottom">{source.description}</p>
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