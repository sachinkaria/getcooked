import React from 'react';
import ReviewItem from './Item';

const ReviewList = (props) => {
  return (
    <div className="gc-tags">
      { props.reviews.map(item =>
        (
          <ReviewItem key={item.name} name={item.name} description={item.description} />
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
