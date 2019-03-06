import React from 'react';
import {Link} from 'react-router';
import {Button, Col, Panel, Row, Table} from 'react-bootstrap';
import moment from 'moment';

function ListItem(props) {
  const {event} = props;
  return (
    <Panel className="gc-panel">
      <Panel.Body className="gc-margin-bottom">
        <Row>
          <Col sm={3} className="center-m left-t">
            <p className="gc-text gc-bold gc-margin-top">Event date</p>
            <p className="gc-text gc-margin-none">
              {moment(event.date).format('MMMM Do YYYY')}
            </p>
          </Col>
          <Col sm={3} className="center-m left-t">
            <p className="gc-text gc-bold gc-margin-top">Services</p>
            {
              event.services.map((service) => {
                return (
                  <p className="gc-text text-capitalize gc-margin-none" key={service}>{service}</p>
                );
              })
            }
          </Col>
          <Col sm={3} className="center-m left-t">
            <p className="gc-text gc-bold gc-margin-top">Event type</p>
            {
              event.eventType.map((type) => {
                return (
                  <p className="gc-text text-capitalize gc-margin-none" key={type}>{type}</p>
                )
              })
            }
          </Col>
          <Col sm={3} className="center-m right-t">
            <Link to={`/dashboard/events/${event._id}`}>
              <Button className="gc-btn gc-btn--orange gc-btn--lg gc-margin-top">
                View Event
              </Button>
            </Link>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}


export default ListItem;
