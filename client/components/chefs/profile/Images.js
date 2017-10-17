import React from 'react';
import { Col } from 'react-bootstrap';
import LightBox from '../../../containers/LightBox';

const Images = (props) => {
  const NUMBER_OF_IMAGES = props.images.length;

  return (
    <div>
      {NUMBER_OF_IMAGES > 0 && (
        <Col>
          <h3 className="gc-center gc-margin-bottom">Photos <span
            className="gc-profile-text-xs"
          >({NUMBER_OF_IMAGES})</span></h3>
          <LightBox images={props.images} />
        </Col>
      )
      }
    </div>
  );
};

Images.propTypes = {
  images: React.PropTypes.array
};

Images.defaultProps = {
  images: []
};


export default Images;