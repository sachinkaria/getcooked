var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Col = require('react-bootstrap').Col;
var Image = require('react-bootstrap').Image;
var StarRatingComponent = require('react-star-rating-component');



var Profile = (props, ...rest) => {
    return (
        <Col xs={6} md={3}>
            <Jumbotron className="gc-padding-none gc-center">
                <Image className="gc-padding-none" src={props.usersInfo.imageUrl} thumbnail />
                    <h3>{props.usersInfo.firstname} {props.usersInfo.surname}</h3>

                {props.usersInfo.endorsements.map(function(endorsement){
                    return <h4 key={endorsement}>{endorsement}</h4>;
                    })
                }
                <div style={{fontSize: 24}}>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={props.usersInfo.rating}
                    />
                </div>
            </Jumbotron>
        </Col>

    )
};

module.exports = Profile;