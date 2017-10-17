import React from 'react';
import Phone from 'react-icons/lib/fa/phone';
import Email from 'react-icons/lib/fa/envelope-o';
import Globe from 'react-icons/lib/fa/globe';

const ContactDetails = (props) => {
  return (
    (props.website || props.email || props.phone) ?
      <div>
        { props.website &&
        <div className="gc-margin-bottom">
          <Globe className="gc-icon gc-list-item gc-grey" />
          <a target="_blank" href={props.website} className="gc-text gc-list-item gc-grey">Website</a>
        </div>
        }
        {
          props.email &&
          <div className="gc-margin-bottom">
            <Email className="gc-icon gc-list-item gc-grey" /><p className="gc-text gc-list-item gc-grey">Email</p>
          </div>
        }
        {
          props.phone &&
          <div className="gc-margin-bottom">
            <Phone className="gc-icon gc-list-item gc-grey" /><p className="gc-text gc-list-item gc-grey">{props.phone}</p>
          </div>
        }
      </div> : <p className="gc-text gc-bold">No contact details provided.</p>
  );
};

ContactDetails.propTypes = {
  website: React.PropTypes.string,
  email: React.PropTypes.string,
  phone: React.PropTypes.number
};

ContactDetails.defaultProps = {
  website: null,
  email: null,
  phone: null
};


export default ContactDetails;