import React from 'react';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Endorsement = React.createClass({
  getInitialState() {
    return {
      description: this.props.description,
      number: this.props.number
    };
  },

  addEndorsement() {
    this.setState(
      { number: this.state.number + 1 }
    );
  },
  render() {
    return (
      <p className="gc-endorsement gc-profile-text-md" onClick={this.addEndorsement}>
        <Label>
          {this.state.description} {this.state.number}
        </Label>
      </p>
    );
  }
});


Endorsement.propTypes = {
  description: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};


export default Endorsement;
