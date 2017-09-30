import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import _ from 'lodash';
import {updateUser} from '../../../../actions/users';
import {SERVICES, EVENTS, TYPES} from '../../../../utils/data';
import renderCheckbox from '../../../forms/renderCheckbox';
import ProgressBar from '../../../progress-bar';


const form = reduxForm({
  form: 'setup-photos',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.firstName = 'Please enter a display name';
  }

  if (!formProps.description) {
    errors.lastName = 'Please enter a description';
  }

  return errors;
}

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: props.user.data.serviceType || [],
      services: props.user.data.services || [],
      events: props.user.data.events || []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  handleFormSubmit() {
    this.props.updateUser(this.state);
  }

  handler(event, category) {
    if (event.target.checked) {
      this.state[category] = this.state[category].concat(event.target.name);
      this.setState(this.state);
    } else {
      this.state[category] = _.pull(this.state[category], (event.target.name));
      this.setState(this.state);
    }
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <Row>
        <div className="gc-progress-bar">
          <ProgressBar progress={0.6} />
        </div>
        <Col sm={6} smOffset={1}>
          <Row>
            <Col sm={6} smOffset={1}>
              <Link className="gc-link-default pull-left" to="/setup-categories">
                <Button className="gc-btn gc-btn--white gc-margin-top" bsSize="small" bsStyle="default">
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
          <br />
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {this.renderAlert()}
            <Row>
              <Col xs={12} sm={10} smOffset={1}>
                <Panel>
                  <p className="gc-form-heading gc-green">Profile Photo</p>
                  <Button bsStyle="primary">
                    Upload photo
                  </Button>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                <Button type="submit" bsSize="small" block className="btn gc-btn gc-btn--orange gc-margin-bottom--xs gc-margin-top">Next</Button>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                <Link className="gc-link-default" to="/setup-photos">
                  <Button className="gc-btn gc-btn--white" bsSize="small" block bsStyle="default">
                    Skip
                  </Button>
                </Link>
              </Col>
            </Row>
          </form>
        </Col>
        <Col xsHidden={true} sm={4}>
          <Panel className="gc-panel gc-margin-top">
            <h3 className="gc-profile-heading-sm">Photos</h3>
            <p className="gc-text">Provide a profile and photo as well as photos of events and food.</p>
          </Panel>
        </Col>
      </Row>
    );
  }
}

Photos.propTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, {updateUser})(form(Photos));
