import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactStars from 'react-stars';

let Rating = (props) => {

    return (
        <Row>
            <Col>
                {props.category && (<h4 className="gc-pull-left">{props.category}</h4>)}
                <Row>
                    <Col xs={10}>
                        <ReactStars
                            count={5}
                            size={props.size}
                            color1={'#ff9900'}
                            color2={'#ffd700'}
                            value={props.value}
                            edit="false"
                        />
                    </Col>
                    <Col xs={2}>
                        <p className="pull-left">{'(' + props.value + ')'}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default Rating;
