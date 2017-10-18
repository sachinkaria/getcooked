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
      <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
        { props.onBack &&
        <Row>
          <Col sm={6} smOffset={1}>
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
            <Col sm={11} smOffset={1}>
              <Row>
                <Col xs={8} xsOffset={2} md={4} mdOffset={4}>
                  <p>{props.errorMessage}</p>
                  <Button
                    type="submit"
                    bsSize="small"
                    block
                    className="btn gc-btn gc-btn--orange gc-margin-bottom--xs gc-margin-top" >
                    Next
                  </Button>
                </Col>
              </Row>
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
            </Col>
          </Row>
        </form>
      </Col>
      <Col xsHidden sm={4}>
        <Row>
          <Col sm={11}>
            <Panel className="gc-panel">
              <h3 className="gc-profile-heading-sm gc-profile-heading-sm--green text-capitalize">{props.sideBarHeading}</h3>
              <p className="gc-text">{props.sideBarText}</p>
            </Panel>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

Wizard.propTypes = {
  children: React.PropTypes.element.isRequired,
  progress: React.PropTypes.number,
  onSubmit: React.PropTypes.func,
  onSkip: React.PropTypes.string,
  onBack: React.PropTypes.string,
  sideBarHeading: React.PropTypes.string,
  sideBarText: React.PropTypes.string,
  errorMessage: React.PropTypes.string
};

Wizard.defaultProps = {
  children: <div>No view inserted</div>
};


export default Wizard;
