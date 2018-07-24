/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

function FoodStyle(props) {
  return (
    <div className="gc-margin-bottom">
      {
        props.foodStyle.map((service) => {
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


FoodStyle.propTypes = {
  foodStyle: PropTypes.array.isRequired
};

export default FoodStyle;
