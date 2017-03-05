let React = require('react');
let ProfileData = require('./../utils/profileData');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let Panel = require('react-bootstrap').Panel;
let Thumbnail = require('react-bootstrap').Thumbnail;
let Image = require('react-bootstrap').Image;
let data = require('./../utils/data');
let Badge = require('./../components/Badge');
let LightBox = require('./../components/LightBox');



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
        console.log(user);
        return (
            <div>
                <Col xs={8} xsOffset={1}>
                    <Panel>
                        <Col xs={10} sm={4}>
                            <Thumbnail src={user.imageUrl} />
                        </Col>
                        <Col xs={10} sm={8}>
                                <h2 className="gc-center gc-margin-none">{user.name}</h2>
                                    <Col xs={12} sm={6} smOffset={3} className="gc-center gc-margin-top">
                                    {user.badges.map(function(badge){
                                        return (
                                                <Badge logo={badge.logo} key={badge.name} />
                                            )
                                        })
                                    }
                                    </Col>
                            <Col xs={12} className="gc-margin-top">
                                <p>{user.description}
                                </p>
                            </Col>
                        </Col>
                        <Col xs={12}>
                            <h2 className="gc-center gc-margin-bottom">Photos</h2>
                            <LightBox images={user.images} />
                        </Col>
                    </Panel>
                </Col>
                <Col xs={2}>
                    <Panel className="gc-center">
                        <h4>Make a booking</h4>
                    </Panel>
                </Col>
            </div>
        )
    }
});
module.exports = Profile;