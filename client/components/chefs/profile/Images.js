import React from 'react';
import { Col, Row } from 'react-bootstrap';
import LightBox from '../../../containers/LightBox';

const Images = (props) => {
  const NUMBER_OF_IMAGES = props.images.length;

  return (
    <div>
      {NUMBER_OF_IMAGES > 0 && (
        <Row>
          <Col>
            <h3 className="gc-center gc-form-heading gc-margin-bottom">Photos</h3>
            <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <LightBox images={props.images} />
            </div>
          </Col>
        </Row>
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