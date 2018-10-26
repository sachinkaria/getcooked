import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LightBox from '../../../containers/LightBox';

const Images = (props) => {
  const NUMBER_OF_IMAGES = props.images.length;

  return (
    <div>
      {NUMBER_OF_IMAGES > 0 && (
        <div className="text-left">
          <h3 className="gc-text gc-profile-heading-md">Photos</h3>
          <div>
            <LightBox images={props.images} />
          </div>
        </div>
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