import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, FormGroup } from 'react-bootstrap';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrash from 'react-icons/lib/fa/trash';

const ImageRender = ({ ...props }) => {
  const styles = {
    backgroundImage: `url(${props.image})`
  };

  const classes = classNames('bu-photo-upload__img', {
    cover: props.type === 'cover'
  });

  return (
    <FormGroup className="bu-m-center">
      <div className={classes} style={styles}>
        <div className="bu-photo-upload__img-inner">
          <Button type="button" className="btn-link bu-file-upload-btn bu-image-preview__edit-img-btn" >
            <input type="file" accept="image/*" onChange={props.onChange} />
            <p style={{ fontSize: '22px' }}>
              <FaPencil />
            </p>
          </Button>
          <Button onClick={props.onDelete} type="button" className="btn-link bu-file-upload-btn bu-image-preview__edit-img-btn" >
            <p style={{ fontSize: '22px' }}>
              <FaTrash />
            </p>
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
