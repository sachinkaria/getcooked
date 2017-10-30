import React from 'react';
import PropTypes from 'prop-types';
import ImageSelect from './ImageSelect';
import ImageRender from './ImageRender';

const ImageUpload = ({ ...props }) => (
  props.inProgress ? // eslint-disable-line no-nested-ternary
    <p>in progress</p> :
    !props.image ?
      <ImageSelect multiple={props.multiple} onChange={props.onUpload} /> :
      <ImageRender
        type={props.type}
        image={props.image}
        onChange={props.onUpload}
        onDelete={props.onDelete}
      />
);

ImageUpload.propTypes = {
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
  image: PropTypes.string,
  inProgress: PropTypes.bool
};

ImageUpload.defaultProps = {
  onUpload: null,
  onDelete: null,
  image: null,
  inProgress: null
};

export default ImageUpload;
