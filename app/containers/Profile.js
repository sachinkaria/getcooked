let React = require('react');
let ProfileData = require('./../utils/profileData');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let Jumbotron = require('react-bootstrap').Jumbotron;
let Thumbnail = require('react-bootstrap').Thumbnail;
let Image = require('react-bootstrap').Image;
let data = require('./../utils/data');
let Badge = require('./../components/Badge');


let Profile = React.createClass ({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentWillMount: function(){
        let user = ProfileData.getData(this.props.params.id, data);
        this.setState({
            userData: user
        })
    },
    render: function () {
        let user = this.state.userData[0];
        return (
            <div>
                <Col xs={8} xsOffset={1}>
                    <Jumbotron>
                        <Col xs={10} sm={4}>
                            <Thumbnail src={user.imageUrl} />
                        </Col>
                        <Col xs={10} sm={8}>
                            <h2 className="gc-center">{user.name}</h2>
                            <Col xs={12} sm={6} smOffset={3} className="gc-center">
                            {user.badges.map(function(badge){
                                return (
                                        <Badge logo={badge.logo} key={badge.name} />
                                    )
                                })
                            }
                            </Col>
                        </Col>
                    </Jumbotron>
                </Col>
            </div>
        )
    }
});
module.exports = Profile;