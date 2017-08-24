import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'react-bootstrap';


const ImageSelect = ({ ...props }) => (
  <FormGroup className="bu-m-center">
    <Button type="button" className="bu-file-upload-btn bu-photo-upload__add bu-photo-upload__add--blue">
      <input type="file" accept="image/*" onChange={props.onChange} />
      <span className="bu-photo-upload__text">Add a profile photo</span>
    </Button>
  </FormGroup>
);

ImageSelect.propTypes = {
  onChange: PropTypes.func,
};

export default ImageSelect;
