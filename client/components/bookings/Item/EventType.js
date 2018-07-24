/**
 * Created by sachinkaria on 24/07/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

function EventType(props) {
  return (
    <div>
      {
        props.eventType.map((service) => {
          return (
            <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
              {service}
            </p>
          );
        })
      }
    </div>
  )
}


EventType.propTypes = {
  eventType: PropTypes.array.isRequired
};

export default EventType;
