import React from 'react';
import {Panel} from 'react-bootstrap';
import {Link} from 'react-router';
import classNames from 'classnames';
import { isChef } from '../../../utils/helpers';

class Sidebar extends React.Component {
  render() {
    const ADMIN_SIDEBAR = (
      <Panel className="gc-panel">
        <Panel.Body>
          <ul className="gc-list gc-padding-none">
            <li>
              <Link to="/admin/dashboard/chefs" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('chefs') })}>
                  Chefs</p>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/users" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('users') })}>
                  Users</p>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/events" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('events') })}>
                  Events</p>
              </Link>
            </li>
            <li>
              <Link to="/admin/dashboard/bookings" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('bookings') })}>
                  Bookings</p>
              </Link>
            </li>
          </ul>
        </Panel.Body>
      </Panel>
    );

    const USER_SIDEBAR = (
      <Panel className="gc-panel">
        <Panel.Body>
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
          {
            isChef() &&
            <Link to="/dashboard/account/subscription" className="gc-link-default">
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('subscription') })}>
                Subscription</p>
            </Link>
          }
        </ul>
        </Panel.Body>
      </Panel>
    );

    const CHEF_SIDEBAR = (
      <Panel className="gc-panel">
        <Panel.Body>
        <ul className="gc-list gc-padding-none">
          <li>
            <Link to="/dashboard/profile/summary" className="gc-link-default" onClick={window.location.reload}>
              <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('summary') })}>Summary</p>
            </Link>
          </li>
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
        </Panel.Body>
      </Panel>
    );

    const BOOKINGS_SIDEBAR = (
      <Panel className="gc-panel">
        <Panel.Body>
          <ul className="gc-list gc-padding-none">
            <li>
              <Link to="/dashboard/bookings" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('bookings') })}>
                  All</p>
              </Link>
            </li>
          </ul>
        </Panel.Body>
      </Panel>
    );

    const EVENTS_SIDEBAR = (
      <Panel className="gc-panel">
        <Panel.Body>
          <ul className="gc-list gc-padding-none">
            <li>
              <Link to="/dashboard/events" className="gc-link-default">
                <p className={classNames('gc-text', { 'gc-green gc-bold': this.props.location.includes('events') })}>
                  All</p>
              </Link>
            </li>
          </ul>
        </Panel.Body>
      </Panel>
    );

    if (this.props.userRole === 'admin') {
      return ADMIN_SIDEBAR;
    }
    else if (this.props.location.includes('profile') && this.props.userRole === 'chef') {
      return CHEF_SIDEBAR;
    } else if (this.props.location.includes('bookings')) {
      return BOOKINGS_SIDEBAR;
    } else if (this.props.location.includes('events')) {
      return EVENTS_SIDEBAR;
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