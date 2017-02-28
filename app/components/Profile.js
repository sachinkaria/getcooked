var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Col = require('react-bootstrap').Col;
var Image = require('react-bootstrap').Image;


var Profile = (props) => {
    return (
        <Col xs={6} md={2}>
            <Jumbotron>
                <Image src={props.usersInfo.imageUrl} thumbnail />
                    <h3>{props.usersInfo.firstname} {props.usersInfo.surname}</h3>

                {props.usersInfo.endorsements.map(function(endorsement){
                    return <h4 key={endorsement}>{endorsement}</h4>;
                    })
                }
            </Jumbotron>
        </Col>

    )
};

module.exports = Profile;