import React from 'react';
import { Link } from 'react-router';

function BlogThumbnail(props) {
  const IMAGE = props.backgroundImage;
  const style = {
    backgroundImage: IMAGE,
    backgroundSize: 'cover',
    height: '240px',
    position: 'relative',
    marginBottom: '10px'
  };
  return (
    <Link to={props.path}>
      <div style={style}>
        <div className="gc-position-bottom-fixed" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
          <h4 className="gc-section-heading gc-center gc-white">
            {props.heading}
          </h4>
        </div>
      </div>
    </Link>
  );
}

export default BlogThumbnail;

