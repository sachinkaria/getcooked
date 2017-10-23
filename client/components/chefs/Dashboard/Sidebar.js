import React from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import classNames from 'classnames';

class Sidebar extends React.Component {
  render() {
    const ADMIN_SIDEBAR = (
      <Panel>
        <ul className="gc-list gc-padding-none">
          <li>
            <Link to="/admin/dashboard/chefs" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('chefs') })}>Chefs</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/dashboard/users" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('users') })}>
                Users</p>
            </Link>
          </li>
        </ul>
      </Panel>
    );

    const USER_SIDEBAR = (
      <Panel>
        <ul className="gc-list gc-padding-none">
          <li>
            <Link to="/dashboard/account/settings" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('settings') })}>
                Settings</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/account/password" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('password') })}>
                Password</p>
            </Link>
          </li>
        </ul>
      </Panel>
    );

    const CHEF_SIDEBAR = (
      <Panel>
        <ul className="gc-list gc-padding-none">
          <li>
            <Link to="/dashboard/profile/basics" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('basics') })}>Basic
                Details</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile/service-type" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('service-type') })}>
                Services</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile/food-services" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('food-services') })}>
                Food</p>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile/photos" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('photos') })}>Photos</p>
            </Link>
          </li>
        </ul>
      </Panel>
    );

    if (this.props.userRole === 'admin') {
      return ADMIN_SIDEBAR;
    }
    else if (this.props.location.includes('profile') && this.props.userRole === 'chef') {
      return CHEF_SIDEBAR;
    }
    return USER_SIDEBAR;
  }
}

Sidebar.propTypes = {
  location: React.PropTypes.string
};

Sidebar.defaultProps = {
  location: '/home'
};


export default Sidebar;