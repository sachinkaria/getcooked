import React from 'react';
import PropTypes from 'prop-types';

function ServicesRequired(props) {
  return (
    <div className="gc-margin-bottom">
      {
        props.services.map((service) => {
          return (
            <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
              {service}
            </p>
          );
        })
      }
    </div>
  );
}


ServicesRequired.propTypes = {
  services: PropTypes.array.isRequired
};

export default ServicesRequired;
