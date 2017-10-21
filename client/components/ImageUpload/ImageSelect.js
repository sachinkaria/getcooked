import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup } from 'react-bootstrap';


const ImageSelect = ({ ...props }) => (
  <Button className="gc-padding-none">
    <input multiple={props.multiple} type="file" className="custom-file-input" accept="image/*" onChange={props.onChange} />
  </Button>
);

ImageSelect.propTypes = {
  onChange: PropTypes.func,
};

export default ImageSelect;
