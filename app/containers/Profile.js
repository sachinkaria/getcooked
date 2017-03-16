let React = require('react');
let ProfileData = require('./../utils/helpers');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let Panel = require('react-bootstrap').Panel;
let Thumbnail = require('react-bootstrap').Thumbnail;
let Image = require('react-bootstrap').Image;
let data = require('./../utils/data');
let Badge = require('./../components/Badge');
let LightBox = require('./LightBox');
let DatePicker = require('./DatePicker');
let Button = require('react-bootstrap').Button;
let Link = require('react-router').Link;
let Review = require('./../components/Review');






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
                    <Panel>
                        <Col xs={10} sm={4}>
                            <Thumbnail onClick={null} src={user.imageUrl} />
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
                            <h3 className="gc-center gc-margin-bottom">Photos</h3>
                            <LightBox images={user.images} />
                        </Col>
                        <Col xs={4} className="gc-margin-top">
                            <Panel>
                                <h3 className="gc-center">Ratings</h3>
                            </Panel>
                        </Col>
                        <Col xs={8} className="gc-margin-top">
                            <Panel>
                                <h3 className="gc-center">Reviews</h3>
                                {user.reviews.map(function(review){
                                    return (
                                        <Review name={review.name} description={review.reviewDescription} />
                                    )
                                })
                                }
                            </Panel>
                        </Col>
                    </Panel>

                </Col>
                <Col xs={2}>
                    <Panel className="gc-center">
                        <Panel>
                            <DatePicker />
                            <Button bsStyle="success" bsSize="medium" className="gc-margin-top" block> Make a Booking </Button>
                        </Panel>
                        <Button bsStyle="primary" bsSize="medium" className=" gc-button gc-margin-top" block>Contact </Button>
                        <Button bsStyle="default" bsSize="medium" className=" gc-button gc-margin-top gc-margin-bottom" block>Add to Favourites </Button>
                        <Link>Share</Link>
                    </Panel>
                </Col>
            </div>
        )
    }
});
module.exports = Profile;