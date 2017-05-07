import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions';
import { Col, Panel, Button } from 'react-bootstrap';

const form = reduxForm({
    form: 'login'
});

class Login extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <Col sm={4} smOffset={4}>
                <Panel className="gc-panel-light gc-center">
                <h4 className="gc-profile-heading-md">Get Cooked</h4>
                    <br />
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <Col sm={8} smOffset={2}>
                        <Field placeholder="Email" name="email" className="form-control gc-input gc-margin-bottom" component="input" type="text" />
                    </Col>
                    <Col sm={8} smOffset={2}>
                        <Field placeholder="Password" name="password" className="form-control gc-input gc-margin-bottom--lg" component="input" type="password" />
                    </Col>
                    <Col xs={12} sm={4} smOffset={4}>
                    <Button type="submit" block bsSize="large" className="btn gc-btn gc-btn--orange">Login</Button>
                        <p className="gc-text">Forgot your password?</p>
                    </Col>
                </form>
                </Panel>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { loginUser })(form(Login));