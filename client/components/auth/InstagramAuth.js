import React from 'react';
import { connect } from 'react-redux';
import { authenticateInstagram } from '../../actions/users';


class InstagramAuth extends React.Component {
  constructor(props) {
    super(props);
    this.getQueryVariable = this.getQueryVariable.bind(this);
  }

  componentDidMount() {
    const code = this.getQueryVariable('code');
    this.props.authenticateInstagram(code);
  }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable %s not found', variable);
  }

  render() {
    return (
      <p>Authenticating</p>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { authenticateInstagram })(InstagramAuth);
