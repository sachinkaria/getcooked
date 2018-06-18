/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.jpg';
import { POSTS } from '../../utils/data';


function ListItem(props) {
  return (
    <Row>
      <Col className="hidden-xs" xs={3}>
        <img
          style={{width: '100%', height: 'auto', marginBottom: '20px' }}
          alt={props.title}
          src={props.image}
        />
      </Col>
      <Col xs={12} sm={9}>
        <Link to={props.src}>
          <h2 className="gc-profile-text-md gc-bold gc-margin-none">
            {props.title}
          </h2>
        </Link>
        <p className="gc-text gc-bold">{props.date}</p>
      </Col>
    </Row>
  );
}

export default ListItem;

