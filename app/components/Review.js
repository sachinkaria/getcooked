let React = require('react');
let Col = require('react-bootstrap').Col;

let Review = (props) => {
    return (
        <div>
            <Col xs={12}>
                <h4>{props.name}</h4>
                <p>{props.description}</p>
            </Col>
        </div>
    )
};

module.exports = Review;
