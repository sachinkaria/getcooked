import React from 'react';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router';

const Sidebar = (props) => {
  return (
    <Panel>
      <ul className="gc-list gc-padding-none">
        <li>
          <Link to="/dashboard/profile/basics" className="gc-link-default">
            <p className="gc-text">Basic Details</p>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile/services" className="gc-link-default">
            <p className="gc-text">Services</p>
          </Link>
        </li>
        <li>
          <Link className="gc-link-default">
            <p className="gc-text">Food</p>
          </Link>
        </li>
        <li>
          <Link className="gc-link-default">
            <p className="gc-text">Photos</p>
          </Link>
        </li>
      </ul>
    </Panel>
  );
};

export default Sidebar;