import React from 'react';

const Services = (props) => {
  return (
    <div className="gc-margin-bottom gc-margin-top--sm">
      <div className="gc-tags">
        { props.services.map(item =>
          (
              <p key={item} className="gc-tag">
                {item}
              </p>
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