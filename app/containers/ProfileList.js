let React = require('react');
let users = require('./../utils/users').data;
let ProfileSummary = require('./../components/ProfileSummary');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let SearchBar = require('./SearchBar');



let ProfileList = React.createClass({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentWillMount: function(){
        this.setState({
            usersInfo: users
        });
    },
  render: function () {
    return (
        <div>
            <Row>
                <SearchBar/>
            </Row>
            <Row>
                <Col xs={10} xsOffset={1}>
                    {
                        this.state.usersInfo.map(function(user){
                            return (
                                <ProfileSummary
                                    id={user.id}
                                    key={user.id}
                                    imageUrl={user.imageUrl}
                                    name={user.name}
                                    rating={user.rating}
                                    endorsements={user.endorsements}
                                    />
                            )
                        })
                    }
                </Col>
            </Row>
        </div>
        )
    }
});

module.exports = ProfileList;
