import React from 'react';
import MobileView from './MobileView';
import DesktopView from './DesktopView';


function UserBooking(props) {
  return (
    <div>
      <div className="visible-xs">
        <MobileView {...props} />
      </div>
      <div className="hidden-xs">
        <DesktopView {...props} />
      </div>
    </div>
  );
}

export default UserBooking;
