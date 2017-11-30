import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button, Row } from 'react-bootstrap';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import renderField from '../../../../components/forms/renderField';
import renderInputBox from '../../../../components/forms/renderInputBox';

const form = reduxForm({
  form: 'setup-basic',
  fields: ['displayName', 'companyWebsite', 'companyEmail', 'companyPhoneNumber', 'minimumTotalBudget', 'minimumPerHeadBudget', 'description'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.displayName = 'Please enter your display name';
  }

  if (!formProps.companyEmail) {
    errors.companyEmail = 'Please enter your professional email';
  }

  if (!formProps.companyPhoneNumber) {
    errors.companyPhoneNumber = 'Please enter your professional contact number';
  }

  if (!formProps.description) {
    errors.description = 'Please enter your description';
  }

  return errors;
}

class BasicInfo extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  handleFormSubmit(formProps) {
    console.log(formProps);
    this.props.updateUser(formProps, null, true);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <label className="gc-text">Display name</label>
        <div>
          <Field
            name="displayName"
            placeholder="e.g. Catering Co."
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="text"
          />
        </div>
        <label className="gc-text">Professional website (optional)</label>
        <div>
          <Field
            name="companyWebsite"
            placeholder="e.g. www.mycateringcompany.com"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="string"
          />
        </div>
        <label className="gc-text">Professional email</label>
        <div>
          <Field
            name="companyEmail"
            placeholder="e.g. hello@cateringco.com"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="string"
          />
        </div>
        <label className="gc-text">Professional contact number</label>
        <div>
          <Field
            name="companyPhoneNumber"
            placeholder="e.g. 0201234567"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="string"
          />
        </div>
        <label className="gc-text">Minimum event budget (optional)</label>
        <p className="gc-profile-text-xs gc-grey">You will only receive inquiries which meet this event budget.</p>
        <Row>
          <Col xs={6} sm={4}>
            <div>
              <Field
                addonText="£"
                withAddon
                name="minimumTotalBudget"
                placeholder="e.g. 500"
                className="form-control gc-input gc-margin-bottom"
                component={renderField}
                type="number"
              />
            </div>
          </Col>
        </Row>
        <label className="gc-text">Minimum per head budget (optional)</label>
        <p className="gc-profile-text-xs gc-grey">You will only receive inquiries which meet this per head budget.</p>
        <Row>
          <Col xs={6} sm={4}>
            <div>
              <Field
                addonText="£"
                withAddon
                name="minimumPerHeadBudget"
                placeholder="e.g. 7"
                className="form-control gc-input gc-margin-bottom"
                component={renderField}
                type="number"
              />
            </div>
          </Col>
        </Row>
        <label className="gc-text">Description</label>
        <div>
          <Field
            name="description"
            placeholder="Write something about your company"
            className="form-control gc-input gc-margin-bottom"
            component={renderInputBox}
            type="text"
          />
        </div>
        <Row>
          <Col xs={10} xsOffset={1} sm={4} smOffset={4} >
            <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
              Save
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

BasicInfo.propTypes = {
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser, getCurrentUser })(form(BasicInfo));
