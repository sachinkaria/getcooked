import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Row, Col, Panel, Button } from 'react-bootstrap';
import ProfilePicture from '../../chefs/profile/ProfilePicture';
import Status from '../../Status';
import ImageUpload from '../../ImageUpload';

function ChefItem({ ...chef }) {
  return (
    <Panel className="gc-panel">
      <Panel.Body>
      <Row>
        <Col xs={3} md={2}>
          <ProfilePicture withoutMargins photoUrl={chef.profilePhoto} />
        </Col>
        <Col xs={6} md={7}>
          <p className="gc-text gc-bold gc-margin-none">{chef.displayName}</p>
          <Status status={chef.status} />
          <p>Name: {chef.firstName ? chef.firstName.concat(' ').concat(chef.lastName) : 'NO NAME'} </p>
          <p>Email: {chef.email}</p>
          <p>Contact Number: {chef.contactNumber}</p>
          <p>Subscription: {chef.subscription && chef.subscription.status}</p>
          <div onClick={() => chef.selectChef(chef.id)}>
            <ImageUpload
              inProgress={false}
              multiple
              onUpload={chef.onImagesUpload}
            />
          </div>
        </Col>
        <Col xs={3} className="text-right">
          <p className="gc-text gc-text--sm gc-bold gc-margin-none">Updated: {moment(chef.updatedAt).format('MMM Do YYYY')}</p>
          <Link to={`/admin/dashboard/chefs/${chef.id}`}>
            <Button block className="gc-btn gc-btn--sm gc-btn-white gc-margin-top--xs">View Profile</Button>
          </Link>
          <div className="gc-margin-top--xs">
            {
              (chef.status === 'pending') &&
              <Button block className="btn gc-btn gc-btn--sm btn-success" onClick={() => chef.updateStatus('approve', chef.id)}>
                Approve
              </Button>
            }
            {
              (chef.status === 'unlisted') &&
              <Button block className="btn gc-btn gc-btn--sm gc-btn-blue" onClick={() => chef.updateStatus('list', chef.id)}>
                List
              </Button>
            }
            {
              (chef.status === 'listed') &&
              <Button block className="btn gc-btn gc-btn--sm btn-danger" onClick={() => chef.updateStatus('unlist', chef.id)}>
                Unlist
              </Button>
            }
          </div>
        </Col>
      </Row>
      </Panel.Body>
    </Panel>
  );
}


ChefItem.propTypes = {
  status: React.PropTypes.string.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  contactNumber: React.PropTypes.string.isRequired
};

export default ChefItem;
