/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

function TypeOfFood(props) {
  return (
    <div className="gc-margin-bottom">
      {
        props.foodServices.map((service) => {
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


TypeOfFood.propTypes = {
  foodServices: PropTypes.array.isRequired
};

export default TypeOfFood;
