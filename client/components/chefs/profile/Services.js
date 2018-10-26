import React from 'react';

const Services = (props) => {
  return (
    <div className="text-left center-m">
      <label className="gc-text gc-profile-heading-md gc-margin-bottom">{props.title}</label>
        <ul className="list-unstyled">
        { props.services.map(item =>
          (

                <li key={item} className="text-capitalize gc-text gc-text--lg">
                  {item}
                </li>
          )
        )}
        </ul>
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