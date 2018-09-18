import React from 'react';
import { Link } from 'react-router';
import { Button, Panel, Row, Col } from 'react-bootstrap';

const CatererItem = (props) => {
  const { caterer, status } = props;
  return (
    <div>
      <Panel className="center-m">
        <Panel.Body>
          <Row>
            <Col xs={12} sm={5}>
              <span
                className="gc-thumbnail gc-thumbnail--xs gc-inline-block pull-left"
                style={{backgroundImage: `url(${caterer.profilePhoto})`, backgroundSize: 'cover'}}
              />
              <span className="gc-text gc-dark-grey gc-bold gc-inline-block gc-capitalize pull-left gc-margin-top--lg">
                {caterer.displayName}
              </span>
            </Col>
            <Col xs={12} sm={4}>
              {
                status === 'confirmed' &&
                <span className="gc-text gc-green gc-bold gc-inline-block gc-capitalize center-m right-t gc-margin-top--lg">
                      Booking Confirmed
                  </span>
              }
              {
                status === 'deposit requested' &&
                <span className="gc-text gc-green gc-bold gc-inline-block gc-capitalize center-m right-t gc-margin-top--lg">
                      Deposit Requested
                  </span>
              }
            </Col>
            <Col xs={6} sm={3} xsOffset={3} smOffset={0} className="text-right">
              <Link to={`/dashboard/events/${props.eventId}/bookings/${props.id}`}>
                <Button block className="gc-btn gc-btn--orange gc-margin-top">View</Button>
              </Link>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    </div>
  );
};

CatererItem.propTypes = {};

export default CatererItem;
/**
 * Created by sachinkaria on 15/09/2018.
 */
