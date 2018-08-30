import React from 'react';
import { Col } from 'react-bootstrap';

const CoverPicture = (props) => {
  const style = {
    backgroundImage: `url(${props.photoUrl})`,
    backgroundSize: 'cover',
    marginTop: '-50px',
    marginLeft: '-50px',
    marginRight: '-50px',
  };

  return (
    <Col md={12}>
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
