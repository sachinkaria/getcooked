import React from 'react';
import { Thumbnail } from 'react-bootstrap';
import classNames from 'classnames';

const ProfilePicture = (props) => {
  const classes = classNames('gc-profile-photo', {
    'gc-profile-photo--without-margins': props.withoutMargins
  });

  const style = {
    backgroundImage: `url(${props.photoUrl})`,
    backgroundSize: 'cover'
  };

  return (
    <Thumbnail className={classes} style={style} onClick={null} />
  );
};

ProfilePicture.propTypes = {
  photoUrl: React.PropTypes.string.isRequired,
  withoutMargins: React.PropTypes.bool
};

ProfilePicture.defaultProps = {
  photoUrl: 'images/chef1.webp',
  withoutMargins: false
};

export default ProfilePicture;
