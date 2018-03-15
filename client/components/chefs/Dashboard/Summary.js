import React from 'react';
import {Panel} from 'react-bootstrap';

class Summary extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Panel>
        <h1>Summary Tab</h1>
        <div>Profile Completion: {user.name }</div>
      </Panel>
    )
  }
}

Summary.propTypes = {
  user: React.PropTypes.obj
};

export default Summary;
