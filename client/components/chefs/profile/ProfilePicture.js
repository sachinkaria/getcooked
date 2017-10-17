import React from 'react';
import { Thumbnail } from 'react-bootstrap';

const ProfilePicture = (props) => {
  const style = {
    backgroundImage: `url(${props.photoUrl})`,
    backgroundSize: 'cover'
  };

  return (
    <Thumbnail className="gc-profile-photo" style={style} onClick={null} />
  );
};

ProfilePicture.propTypes = {
  photoUrl: React.PropTypes.string.isRequired
};

ProfilePicture.defaultProps = {
  photoUrl: 'images/chef1.jpg'
};

export default ProfilePicture;
