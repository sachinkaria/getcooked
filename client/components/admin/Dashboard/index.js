import React from 'react';
import _ from 'lodash';
import moment from 'moment';
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
  adminListBookingsByChef,
  updateEvent,
  sendIncompleteProfileEmail
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
      chefs: [],
      selectedChef: '',
      selectedStatus: '',
      data_uri: '',
      filename: '',
      filetype: '',
      processing: '',
      images: [],
      events: []
    };
    this.updateStatus = this.updateStatus.bind(this);
    this.onImagesUpload = this.onImagesUpload.bind(this);
    this.selectChef = this.selectChef.bind(this);
    this.handleChefSelect = this.handleChefSelect.bind(this);
    this.handleStatusSelect = this.handleStatusSelect.bind(this);
    this.sendIncompleteProfileEmail = this.sendIncompleteProfileEmail.bind(this);
    this.sortEvents = this.sortEvents.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.adminListChefs();
    this.props.adminListUsers();
    this.props.adminListEvents();
    this.props.adminListBookings();
  }

  componentWillReceiveProps(){
    this.setState({ chefs: this.props.chefs, events: this.props.events });
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

  sendIncompleteProfileEmail(name, email) {
    this.props.sendIncompleteProfileEmail(name, email);
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

  handleStatusSelect(e){
    this.setState({ selectedStatus: e.target.value }, () => {
      const CHEFS = _.filter(this.props.chefs, o => o.status === this.state.selectedStatus);
      return this.setState({ chefs: CHEFS });
    });
  }

  sortEvents(e){
    const EVENTS = _.sortBy(this.state.events, '-' + e.target.value);
    this.setState({ events: EVENTS });
  }

  filterEvents(e){
    if (e.target.value === 'upcoming'){
      const EVENTS = _.filter(this.props.events, (event) => moment(event.date).isAfter(Date.now()));
      return this.setState( { events: EVENTS })
    } else if (e.target.value === 'past') {
      const EVENTS = _.filter(this.props.events, (event) => moment(event.date).isBefore(Date.now()));
      return this.setState( { events: EVENTS });
    }
    return this.setState( { events: this.props.events });
  }
  render() {
    const { user } = this.props;
    const { users, bookings } = this.props;
    const { events } = this.state;

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
            <Col smOffset={0} sm={3}>
              {
                this.props.location.pathname.includes('chefs') &&
                <div>
                  <select
                    className="form-control gc-input"
                    onChange={this.handleStatusSelect}
                  >
                    <option value={0}>All</option>
                    <option key="pending" value="pending">Pending</option>
                    <option key="listed" value="listed">Listed</option>
                    <option key="unlisted" value="unlisted">Unlisted</option>
                    <option key="hidden" value="hidden">Hidden</option>

                  </select>
                </div>
              }
              {
                this.props.location.pathname.includes('events') &&
                <div>
                  <label>Sort By</label>
                  <select
                    className="form-control gc-input"
                    onChange={this.sortEvents}
                  >
                    <option key="none" value="updatedAt">None</option>
                    <option key="date" value="date">Event Date</option>
                    <option key="updated" value="updatedAt">Last Updated</option>
                  </select>
                  <label>Filter By</label>
                  <select
                    className="form-control gc-input"
                    onChange={this.filterEvents}
                  >
                    <option key="all" value="all">All</option>
                    <option key="upcoming" value="upcoming">Upcoming</option>
                    <option key="past" value="past">Past</option>
                  </select>

                </div>
              }
            </Col>
            <Col smOffset={0} sm={7}>
              {
                (this.props.location.pathname.includes('chefs') && this.state.chefs.length > 0) &&
                <div>
                  {this.state.chefs.map(chef =>
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
                        sendIncompleteProfileEmail={this.sendIncompleteProfileEmail}
                        createBooking={this.props.adminCreateBooking}
                        acceptedBookings={chef.acceptedBookings}
                        minimumPerHeadBudget={chef.minimumPerHeadBudget}
                        minimumTotalBudget={chef.minimumTotalBudget}
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
                        userItem={item.user || item.contactDetails}
                        booking={item}
                        updateEvent={this.props.updateEvent}
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
                    {this.state.chefs.map(item =>
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
  getCurrentUser: React.PropTypes.func.isRequired,
  adminListChefs: React.PropTypes.func.isRequired,
  adminListUsers: React.PropTypes.func.isRequired,
  adminListEvents: React.PropTypes.func.isRequired,
  adminListBookings: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const CHEFS = _.orderBy(state.admin.chefs, ['acceptedBookings', 'displayName'], ['desc', 'asc']);
  return {
    user: state.user,
    chefs: CHEFS,
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
  adminListBookingsByChef,
  updateEvent,
  sendIncompleteProfileEmail
})(AdminDashboard);