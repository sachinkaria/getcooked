import React from 'react';

const Services = (props) => {
  return (
    <div className="gc-center">
      <label className="gc-text gc-margin-bottom gc-form-heading gc-bold">{props.title}</label>
      <div className="gc-tags">
        { props.services.map(item =>
          (
            <div key={item} className="gc-inline-block">
              <p className="text-capitalize gc-text">
                {item}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

Services.propTypes = {
  services: React.PropTypes.array
};

Services.defaultProps = {
  services: []
};


export default Services;