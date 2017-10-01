import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'react-bootstrap';

const ImageRender = ({ ...props }) => {
  const styles = {
    backgroundImage: `url(${props.image})`
  };

  return (
    <FormGroup className="bu-m-center">
      <div className="bu-photo-upload__img" style={styles}>
        <div className="bu-photo-upload__img-inner">
          <Button type="button" className="btn-link bu-file-upload-btn bu-image-preview__edit-img-btn">
            <input type="file" accept="image/*" onChange={props.onChange} />
            Change picture
          </Button>

          <Button type="button" className="btn-link bu-image-preview__remove-img-btn" onClick={props.onRemove}>
            Remove picture
          </Button>
        </div>
      </div>
    </FormGroup>
  );
};

ImageRender.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  image: PropTypes.string
};

export default ImageRender;
