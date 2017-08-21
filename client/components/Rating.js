import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactStars from 'react-stars';

const COLOUR_FILLED = '#ff9900';
const COLOUR_EMPTY = '#ffd700';


const Rating = props => (
  <Row>
    <Col>
      {props.category && (<h4 className="gc-pull-left">{props.category}</h4>)}
      <Row>
        <Col>
          <ReactStars
            count={5}
            size={props.size}
            color1={COLOUR_FILLED}
            color2={COLOUR_EMPTY}
            value={props.value}
            edit="false"
          />
          <p className="gc-pull-left">{`(${props.value})`}</p>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Rating;
