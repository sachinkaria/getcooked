import React from 'react';
import axios from 'axios';

class InstagramAuth extends React.Component {
  constructor(props){
    super(props);
    this.getQueryVariable = this.getQueryVariable.bind(this);
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

  componentDidMount() {
    const code = this.getQueryVariable('code');
    const PARAMS = { code };
    const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
    return axios.get(`/api/users/me/instagram?code=${code}`, AUTH_HEADERS);
  }
  render() {
    return (
      <p>Authenticating</p>
    );
  }
}

export default InstagramAuth;