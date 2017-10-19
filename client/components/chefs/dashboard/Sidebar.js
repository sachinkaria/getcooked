import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import classNames from 'classnames';

const Sidebar = (props) => {
  return (
    <Panel>
      <ul className="gc-list gc-padding-none">
        <li>
          <Link to="/dashboard/profile/basics" className="gc-link-default">
            <p className={classNames('gc-text', { 'gc-green gc-bold': props.location.includes('basics') })}>Basic Details</p>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile/services" className="gc-link-default">
            <p className={classNames('gc-text', { 'gc-green gc-bold': props.location.includes('services') })}>Services</p>
          </Link>
        </li>
        <li>
          <Link className="gc-link-default">
            <p className={classNames('gc-text', { 'gc-green gc-bold': props.location.includes('food') })}>Food</p>
          </Link>
        </li>
        <li>
          <Link className="gc-link-default">
            <p className={classNames('gc-text', { 'gc-green': props.location.includes('photos') })}>Photos</p>
          </Link>
        </li>
      </ul>
    </Panel>
  );
};

Sidebar.propTypes = {
  location: React.PropTypes.string
};

Sidebar.defaultProps = {
  location: '/home'
};


export default Sidebar;