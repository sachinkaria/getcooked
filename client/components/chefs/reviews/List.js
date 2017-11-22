import React from 'react';
import ReviewItem from './Item';

const ReviewList = (props) => {
  return (
    <div className="container">
      { props.reviews.map(item =>
        (
          <div key={item.name}>
            <hr />
            <ReviewItem key={item.name} {...item} />
          </div>
        )
      )}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: React.PropTypes.array
};

ReviewList.defaultProps = {
  reviews: []
};

export default ReviewList;
