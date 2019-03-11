import React from 'react';
import {Row, Col, Panel, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import ListItem from './ListItem';
import {getEvents} from '../../../../actions/events';
import {FAQ_USERS} from '../../../../utils/data';
import BlogThumbnail from '../../../BlogThumbnail';

const NO_EVENTS = 'You have no previous events.';

class Events extends React.Component {
  componentWillMount() {
    this.props.getEvents();
  }

  renderContent() {
    if (this.props.events && this.props.events.length) {
      const {events} = this.props;
      return (
        <div>
          <Row>
            <Col xs={12} className="gc-margin-bottom">
              <h2 className="gc-profile-heading-lg gc-margin-bottom--xs">Thanks for your event details! Your event
                manager will be in touch shortly.</h2>
              <p className="gc-text gc-text--slim gc-text--lg gc-grey gc-margin-bottom">Note: If we are unable to
                contact you we will assume you are no longer looking for catering options for your event.
              </p>
              <Row>
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                  <Panel className="gc-panel gc-center">
                    <Panel.Body>
                      <Row>
                        <Col xs={12}>
                          <Image src="/images/michael.webp" style={{width: '100%', marginBottom: '10px'}}/>
                          <p className="gc-text gc-text--lg gc-bold gc-margin-none">
                            Michael
                          </p>
                          <p className="gc-text gc-text--lg gc-text--slim gc-grey">
                            Event Manager
                          </p>
                        </Col>
                      </Row>
                    </Panel.Body>
                  </Panel>
                </Col>
                <Col xs={12}>
                  <h2 className="gc-profile-heading-md gc-margin-bottom">Your event details</h2>
                  {events.map((event, i) =>
                    (
                      <ListItem
                        key={i}
                        event={event}
                      />
                    )
                  )
                  }
                </Col>
              </Row>
            </Col>
            <Col xs={12} className="gc-margin-bottom">
              <h2 className="gc-profile-heading-md gc-margin-bottom">Frequently asked questions</h2>
              {
                FAQ_USERS.map(question =>
                  (
                    <Panel
                      className="gc-panel gc-panel--faq gc-margin-bottom"
                      key={question.title}
                      id="collapsible-panel-example-2"
                    >
                      <Panel.Heading>
                        <Panel.Title toggle>
                          <p className="gc-text gc-text--lg gc-margin-none gc-bold">
                            {question.title}
                          </p>
                        </Panel.Title>
                      </Panel.Heading>
                      <Panel.Collapse>
                        <Panel.Body>
                          <p className="gc-text gc-text--lg">
                            {question.body}
                          </p>
                        </Panel.Body>
                      </Panel.Collapse>
                    </Panel>
                  ))
              }
            </Col>
          </Row>
          <Row className="gc-margin-bottom">
            <Col xs={12}>
              <h2 className="gc-profile-heading-md gc-margin-bottom">Blog posts</h2>
            </Col>
            <Col xs={12} sm={6}>
              <BlogThumbnail
                backgroundImage="url(/images/tableware.webp)"
                heading="5 Things To Consider When Planning Your Catering Budget"
                path={'/blog/5-things-to-consider-when-planning-your-catering-budget'}
              />
            </Col>
            <Col xs={12} sm={6}>
              <BlogThumbnail
                backgroundImage="url(/images/carrots.webp)"
                heading=" What is Sustainable Catering?"
                path={'/blog/what-is-sustainable-catering'}
              />
            </Col>
          </Row>
        </div>
      );
    }
    return (
      <p className="gc-text gc-center">{NO_EVENTS}</p>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

Events.propTypes = {
  events: React.PropTypes.array.isRequired,
  getEvents: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    events: state.user.events
  };
}

export default connect(mapStateToProps, {getEvents})(Events);
