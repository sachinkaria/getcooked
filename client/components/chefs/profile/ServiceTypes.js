import React from 'react';

const ServiceTypes = (props) => {
  return (
    <div className="text-center">
      { props.serviceTypes.map(item =>
        (
          <div key={item} className="gc-inline-block">
            <p className="text-capitalize gc-text gc-form-heading gc-bold">
              {item}
            </p>
          </div>
        )
      )}
    </div>
  );
};

ServiceTypes.propTypes = {
  serviceTypes: React.PropTypes.array
};

ServiceTypes.defaultProps = {
  serviceTypes: []
};


export default ServiceTypes;