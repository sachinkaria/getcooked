import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactStars from 'react-stars';

const COLOUR_FILLED = '#ff9900';
const COLOUR_EMPTY = '#ffd700';


const Rating = props => (
  <div className="gc-center">
    {props.category && (<h4 className="gc-text gc-bold text-capitalize">{props.category}</h4>)}
    <ReactStars
      count={5}
      size={props.size}
      color1={COLOUR_FILLED}
      color2={COLOUR_EMPTY}
      value={props.value}
      edit="false"
    />
    <p className="gc-profile-text-xs">{`(${props.value})`}</p>
  </div>
);

export default Rating;
