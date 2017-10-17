import React from 'react';
import { Col } from 'react-bootstrap';

const CoverPicture = (props) => {
  const style = {
    backgroundImage: `url(${props.photoUrl})`,
    backgroundSize: 'cover'
  };

  return (
    <Col md={10} mdOffset={1}>
      <div style={style} className="gc-profile-cover" />
    </Col>
  );
};

CoverPicture.propTypes = {
  photoUrl: React.PropTypes.string.isRequired
};

CoverPicture.defaultProps = {
  photoUrl: 'images/chef1.jpg'
};

export default CoverPicture;
