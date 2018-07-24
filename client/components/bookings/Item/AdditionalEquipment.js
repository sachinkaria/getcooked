/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

function AdditionalEquipment(props) {
  return (
    <div className="gc-margin-bottom">
      {
        props.additionalEquipment.map((service) => {
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


AdditionalEquipment.propTypes = {
  additionalEquipment: PropTypes.array.isRequired
};

export default AdditionalEquipment;
