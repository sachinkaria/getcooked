var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;


var Profile = (props) => {
    return (
        <Jumbotron>
            <h3>{props.usersInfo.firstname} {props.usersInfo.surname}</h3>
            {props.usersInfo.endorsements.map(function(endorsement){
                    return <h4>{endorsement}</h4>;
                })
            }
        </Jumbotron>
    )
}

module.exports = Profile;