import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return null;
  }
}

export default connect(null, actions)(Logout);
