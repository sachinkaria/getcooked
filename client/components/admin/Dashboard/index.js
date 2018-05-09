import React from 'react';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/users';
import {
  adminListChefs,
  updateStatus,
  adminListUsers,
  adminUploadPhotos,
  updateMonthlyCoupons,
  adminListEvents,
  adminCreateBooking,
  adminListBookings,
  adminListBookingsByChef
} from '../../../actions/admin';
import DashboardNavBar from '../../users/dashboard/Navbar';
import ChefItem from './ChefItem';
import UserItem from './UserItem';
import EventItem from './EventItem';
import BookingItem from './BookingItem';
import Sidebar from '../../chefs/Dashboard/Sidebar';


class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChef: '',
      data_uri: '',
      filename: '',
      filetype: '',
      processing: '',
      images: []
    };
    this.updateStatus = this.updateStatus.bind(this);
    this.onImagesUpload = this.onImagesUpload.bind(this);
    this.selectChef = this.selectChef.bind(this);
    this.handleChefSelect = this.handleChefSelect.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.adminListChefs();
    this.props.adminListUsers();
    this.props.adminListEvents();
    this.props.adminListBookings();
  }

  onImagesUpload(e) {
    let FILE_NUMBER = 1;
    const NUMBER_OF_FILES = e.target.files.length;
    Object.keys(e.target.files).forEach(function (key) {
      const reader = new FileReader();
      const FILE = e.target.files[key];
      reader.onload = (upload) => {
        this.setState({
          images: [...this.state.images, {
            data_uri: upload.target.result,
            filename: FILE.name,
            filetype: FILE.type
          }]
        }, () => {
          if (FILE_NUMBER < NUMBER_OF_FILES) {
            FILE_NUMBER += 1;
          } else {
            this.setState({ processing: 'normal' });
            this.props.adminUploadPhotos(this.state.images, this.state.selectedChef);
            this.setState({ images: [] });
          }
        });
      };
      reader.readAsDataURL(FILE);
    }.bind(this));
  }

  updateStatus(status, id) {
    this.props.updateStatus(status, id);
  }

  selectChef(selectedChef) {
    this.setState({ selectedChef });
  }

  handleChefSelect(e) {
    const selectedChef = e.target.value;
    if (selectedChef.length === 1) {
      this.setState({ selectedChef: ''}, () => {
        this.props.adminListBookings();
      });
    } else {
      this.setState({ selectedChef }, () => {
        this.props.adminListBookingsByChef(this.state.selectedChef);
      });
    }
  }

  render() {
    const { user } = this.props;
    const { chefs, users, events, bookings } = this.props;

    if (!user.data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={user.data.role} />
        <div className="gc-dashboard-container">
          <Row>
            <Col sm={3} smOffset={1} mdOffset={1} md={2}>
              <Sidebar location={this.props.location.pathname} userRole={user.data.role} />
            </Col>
            <Col smOffset={0} sm={7}>
              {
                this.props.location.pathname.includes('chefs') &&
                <div>
                  <Button onClick={this.props.updateMonthlyCoupons}>Add Coupons</Button>
                  {chefs.map(chef =>
                    (
                      <ChefItem
                        id={chef._id}
                        key={chef._id}
                        firstName={chef.firstName}
                        lastName={chef.lastName}
                        email={chef.email}
                        contactNumber={chef.contactNumber}
                        subscription={chef.subscription}
                        profilePhoto={chef.profilePhoto}
                        status={chef.status}
                        updatedAt={chef.updatedAt}
                        onImagesUpload={this.onImagesUpload}
                        selectChef={this.selectChef}
                        updateStatus={this.updateStatus}
                        createBooking={this.props.adminCreateBooking}
                        acceptedBookings={chef.acceptedBookings}
                      />
                    )
                  )}
                </div>
              }
              {
                this.props.location.pathname.includes('users') &&
                <Panel className="gc-panel">
                  {users.map(userItem =>
                    (
                      <UserItem
                        key={userItem._id}
                        firstName={userItem.firstName}
                        lastName={userItem.lastName}
                        email={userItem.email}
                        mobileNumber={userItem.mobileNumber}
                      />
                    )
                  )}
                </Panel>
              }
              {
                this.props.location.pathname.includes('events') &&
                <div>
                  {events.map(item =>
                    (
                      <EventItem
                        key={item._id}
                        userItem={item.contactDetails}
                        booking={item}
                      />
                    )
                  )}
                </div>
              }
              {
                this.props.location.pathname.includes('bookings') &&
                <div>
                  <select
                    className="form-control gc-input"
                    value={this.state.selectedChef}
                    onChange={this.handleChefSelect}
                  >
                    <option value={0}>All</option>
                    {chefs.map(item =>
                      (
                        <option key={item._id} value={item._id}>{item.displayName}</option>
                      )
                    )}
                  </select>
                  {bookings && bookings.map(item =>
                    (
                      <BookingItem
                        key={item._id}
                        chefItem={item.chef}
                        booking={item}
                      />
                    )
                  )}
                </div>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  user: React.PropTypes.shape({ user: { data: {} } }).isRequired,
  location: React.PropTypes.shape({ location: { pathname: React.PropTypes.string } }).isRequired,
  getCurrentUser: React.PropTypes.func.isRequired,
  adminListChefs: React.PropTypes.func.isRequired,
  adminListUsers: React.PropTypes.func.isRequired,
  adminListEvents: React.PropTypes.func.isRequired,
  adminListBookings: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    chefs: state.admin.chefs,
    users: state.admin.users,
    events: state.admin.events,
    bookings: state.admin.bookings
  };
}

export default connect(mapStateToProps, {
  getCurrentUser,
  adminListChefs,
  updateStatus,
  adminListUsers,
  adminUploadPhotos,
  updateMonthlyCoupons,
  adminListEvents,
  adminCreateBooking,
  adminListBookings,
  adminListBookingsByChef
})(AdminDashboard);
