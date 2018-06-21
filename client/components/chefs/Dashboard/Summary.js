import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';
import ProgressCircle from '../../ProgressCircle';
import { PROFILE_FIELDS } from '../../../utils/data';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, incompleteFields: [], unListable: false, requiredFields: [] };
  }

  componentWillReceiveProps() {
    const { user } = this.props;

    let completed = 0;
    const FULL_PROFILE = PROFILE_FIELDS.length;
    const incompleteFields = [];

    PROFILE_FIELDS.forEach((item) => {
      const FIELD = item.field;
      const NAME = item.name;
      const PATH = item.path;
      const REQUIRED = item.required;
      const USER_FIELD = user[FIELD] && (user[FIELD].length > 0 || !_.isEmpty(user[FIELD]));
      USER_FIELD ?
        (completed += 1)
        :
        incompleteFields.push({ name: NAME, path: PATH, required: REQUIRED });
      if (PROFILE_FIELDS.indexOf(item) === PROFILE_FIELDS.length - 1) {
        const progress = (completed / FULL_PROFILE).toFixed(2);
        const requiredFields = _.filter(incompleteFields, field => field.required);
        const unListable = requiredFields.length > 0;
        this.setState({ progress, incompleteFields, unListable, requiredFields });
      }
    });
  }

  render() {
    return (
      <div>
        <Panel className="gc-panel">
          <Panel.Heading>
            <h4 className="gc-text gc-bold gc-center gc-margin-none gc-padding-none">Profile Summary</h4>
            <p className="gc-text gc-text--slim gc-margin-none gc-center gc-grey gc-margin-top--xs">Optimise your profile by completing all the fields.</p>
          </Panel.Heading>
          <Panel.Body>
            {
              this.state.requiredFields.length > 0 &&
              <Row>
                <Col xs={12} sm={10} smOffset={1}>
                  <Panel className="gc-panel gc-panel--alert gc-panel--error">
                    <Panel.Body>
                      <p className="gc-text gc-bold">Complete the following fields to have your profile listed:</p>
                      <ul className="gc-list">
                        {
                          this.state.requiredFields.map((field) => {
                            return (
                              <Link className="gc-link-default" to={field.path} key={field.name}>
                                <li className="gc-text text-capitalize">{field.name}</li>
                              </Link>
                            );
                          })
                        }
                      </ul>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
            }
            <Row>
              {
                this.state.incompleteFields.length > 0 &&
                <Col xs={12} sm={5} smOffset={1}>
                  <Panel className="gc-panel">
                    <Panel.Heading>
                      <Row>
                        <h4 className="gc-text gc-bold gc-center gc-margin-none">Missing information</h4>
                      </Row>
                    </Panel.Heading>
                    <Panel.Body>
                      <div>
                        {
                          this.state.incompleteFields.map((field) => {
                            return (
                              <Link className="gc-link-default" to={field.path} key={field.name}>
                                <p className="gc-text text-capitalize">{field.name}</p>
                              </Link>
                            );
                          })
                        }
                      </div>
                    </Panel.Body>
                  </Panel>
                </Col>
              }
              <Col xs={12} sm={this.state.incompleteFields.length ? 6 : 12} className={ this.state.incompleteFields.length && 'gc-center' }>
                <ProgressCircle
                  text={`${(this.state.progress * 100).toFixed(0)}%`}
                  progress={parseFloat(this.state.progress)}
                  height={'200px'}
                  width={'200px'}
                  color={parseInt(this.state.progress) === 1 ? 'rgb(48, 190, 157)' : 'rgb(240, 184, 47)'}
                />
                {
                  parseInt(this.state.progress) === 1 &&
                  <p className="gc-text gc-center gc-margin-top">Your profile is up to date!</p>
                }
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

Summary.propTypes = {
  user: React.PropTypes.obj
};

export default Summary;
