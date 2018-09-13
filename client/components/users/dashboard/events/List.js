import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { getEvents } from '../../../../actions/events';

const NO_EVENTS = 'You have no previous events.';

class Events extends React.Component {
  componentWillMount() {
    this.props.getEvents();
  }

  renderContent() {
    if (this.props.events && this.props.events.length) {
      const { events } = this.props;
      return (
        <Row>
          <Col className="gc-center">
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

export default connect(mapStateToProps, { getEvents })(Events);
