import React from 'react';
import PropTypes from 'prop-types';
import ImageSelect from './ImageSelect';
import ImageRender from './ImageRender';

const ImageUpload = ({ ...props }) => (
  props.inProgress ? // eslint-disable-line no-nested-ternary
    <p>in progress</p> :
    !props.image ?
      <ImageSelect onChange={props.onUpload} /> :
      <ImageRender
        type={props.type}
        image={props.image}
        onChange={props.onUpload}
        onRemove={props.onRemove}
      />
);

ImageUpload.propTypes = {
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  image: PropTypes.string,
  inProgress: PropTypes.bool
};

ImageUpload.defaultProps = {
  onUpload: null,
  onRemove: null,
  image: null,
  inProgress: null
};

export default ImageUpload;
