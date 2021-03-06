import React from 'react';
import { Link } from 'react-router';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import ProgressBar from '../ProgressBar';

function Wizard(props) {
  const children = props.children;
  return (
    <Row>
      <div className="gc-progress-bar">
        <ProgressBar progress={props.progress} />
      </div>
      <Col xs={10} xsOffset={1} sm={6} smOffset={1} md={5} mdOffset={2} className="gc-margin-top">
        { props.onBack &&
        <Row>
          <Col sm={6}>
            <Link className="gc-link-default pull-left" to={props.onBack}>
              <Button className="gc-btn gc-btn--white gc-margin-bottom" bsSize="small" bsStyle="default">
                Back
              </Button>
            </Link>
          </Col>
        </Row>
        }
        <form onSubmit={props.onSubmit}>
          {children}
          <Row>
            <Col xs={8} xsOffset={2} md={4} mdOffset={4}>
              <p>{props.errorMessage}</p>
              {!props.loading ?
                <Button
                  type="submit"
                  bsSize="small"
                  block
                  className="btn gc-btn gc-btn--orange gc-margin-bottom--xs gc-margin-top" >
                  Next
                </Button>
                :
                <span className="gc-icon gc-icon--xl gc-icon--loading text-center" />
              }
            </Col>
          </Row>
          {
            !props.disableSkip &&
            <Row>
              <Col xs={8} xsOffset={2} md={4} mdOffset={4}>
                <Link className="gc-link-default" to={props.onSkip}>
                  <Button className="gc-btn gc-btn--white" bsSize="small" block bsStyle="default">
                    Skip
                  </Button>
                  <br />
                </Link>
              </Col>
            </Row>
          }
        </form>
      </Col>
      <Col xsHidden sm={4} md={3} className="gc-margin-top">
        <Row>
          <Col>
            <Panel className="gc-panel">
              <Panel.Body>
                <h3 className="gc-profile-heading-sm gc-profile-heading-sm--green text-capitalize">{props.sideBarHeading}</h3>
                <p className="gc-text">{props.sideBarText}</p>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

Wizard.propTypes = {
  children: React.PropTypes.element.isRequired,
  progress: React.PropTypes.number.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  onSkip: React.PropTypes.string,
  onBack: React.PropTypes.string,
  sideBarHeading: React.PropTypes.string,
  sideBarText: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
  disableSkip: React.PropTypes.bool
};

Wizard.defaultProps = {
  children: <div>No view inserted</div>,
  disableSkip: false,
  sideBarText: '',
  sideBarHeading: '',
  onBack: null,
  onSkip: null,
  errorMessage: null
};


export default Wizard;
