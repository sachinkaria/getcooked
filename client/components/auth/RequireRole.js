import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function (ComposedComponent, role) {
  class RequireRole extends Component {
    componentWillMount() {
      const { user } = this.props;
      if (user.data && (user.data.role !== role)) {
        browserHistory.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      const { user } = nextProps;
      if (user.data && (user.data.role !== role)) {
        browserHistory.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { user: state.user };
  }

  return connect(mapStateToProps)(RequireRole);
}
