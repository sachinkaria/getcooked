import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import classNames from 'classnames';

const DashboardNavBar = (props) => {
  return (
    <div>
      <Navbar className="gc-dashboard-navbar">
        <ul>
          <li className="gc-dashboard-navbar-item">
            <Link to={'/dashboard/profile/basics'}>
              <p className={classNames('gc-text gc-light-grey', { 'gc-white': props.location.includes('profile') })}>Profile</p>
            </Link>
          </li>
          <li className="gc-dashboard-navbar-item">
            <Link to={'/dashboard/account/settings'}>
              <p className={classNames('gc-text gc-light-grey', { 'gc-white': props.location.includes('account') })}>Account</p>
            </Link>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

DashboardNavBar.propTypes = {
  location: React.PropTypes.string
};

DashboardNavBar.defaultProps = {
  location: '/home'
};

export default DashboardNavBar;
