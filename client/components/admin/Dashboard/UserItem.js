import React from 'react';

function UserItem({ ...userItem }) {
  return (
    <div key={userItem.email}>
      <p className="gc-text">
        Name: {userItem.firstName} {userItem.lastName}
      </p>
      <p className="gc-text">
        Email: {userItem.email}
      </p>
      <p className="gc-text">
        Phone number: {userItem.mobileNumber}
      </p>
    </div>
  );
}


UserItem.propTypes = {
  userItem: React.PropTypes.shape({
    firstName: React.PropTypes.string,
    lastName: React.PropTypes.string,
    mobileNumber: React.PropTypes.string
  }).isRequired
};

export default UserItem;
