import React from 'react';
import classNames from 'classnames';
import Phone from 'react-icons/lib/fa/phone';
import Email from 'react-icons/lib/fa/envelope-o';
import Globe from 'react-icons/lib/fa/globe';

const ContactDetails = (props) => {
  const classes = classNames('gc-margin-bottom', {
    'gc-inline-block': props.mobile
  });

  const EMAIL_LINK = 'mailto:'.concat(props.email);
  const WEBSITE_LINK = 'http://'.concat(props.website);
  const PHONE_LINK = 'tel:'.concat(props.phone);

  return (
    (props.website || props.email || props.phone) ?
      <div>
        { props.website &&
        <div className={classes}>
          <Globe className="gc-icon gc-list-item" />
          <a target="_blank" href={WEBSITE_LINK} className="gc-text gc-list-item">{props.website}</a>
        </div>
        }
        {
          props.email &&
          <div className={classes}>
            <Email className="gc-icon gc-list-item" /><a href={EMAIL_LINK} className="gc-text gc-list-item">{props.email}</a>
          </div>
        }
        {
          props.phone &&
          <div className={classes}>
            <Phone className="gc-icon gc-list-item" /><a href={PHONE_LINK} className="gc-text gc-list-item">{props.phone}</a>
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