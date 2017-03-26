import React from 'react';
import _ from 'lodash';
import getProfileData from './../utils/helpers';
import LightBox from './LightBox';
import Endorsement from './Endorsement';
import Review from './../components/Review';
import Badge from './../components/Badge';
import Rating from './../components/Rating';
import BookingForm from './BookingForm';
import { Col, Panel, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import data from './../utils/data';


let Profile = React.createClass ({
    getInitialState: function () {
        return {
            usersInfo: []
        }
    },
    componentWillMount: function(){
        let user = getProfileData(this.props.params.id, data);
        this.setState({
            userData: user
        })
    },
    render: function () {
        let user = this.state.userData;
        let endorsements = _.sortBy(user.endorsements, 'number').reverse();
        let imagesCount = user.images.length;
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
                            <h3 className="gc-center gc-margin-bottom">Photos <span className="gc-profile-text-xs">({imagesCount})</span></h3>
                            <LightBox images={user.images} />
                        </Col>
                        <Col xs={12} className="gc-margin-top">
                            <Col xs={12} className="gc-center">
                                <h3>Reviews <span className="gc-profile-text-xs">({user.numberOfRatings})</span></h3>
                            </Col>
                            <Col xs={8}>
                                    {user.reviews.map(function(review){
                                        return (
                                            <Review key={review.name} name={review.name} description={review.reviewDescription} />
                                        )
                                    })
                                    }
                            </Col>
                            <Col xs={4}>
                                {user.ratings.map(function(rating){
                                    return (
                                        <Rating key={rating.category} category={rating.category} value={rating.value} />
                                    )
                                })
                                }
                            </Col>

                            <Col xs={4} className="gc-margin-top--large">
                                {endorsements.map(function(endorsement){
                                    return (
                                        <Endorsement key={endorsement.description} description={endorsement.description} number={endorsement.number} />
                                    )
                                })
                                }
                            </Col>
                        </Col>
                    </Panel>

                </Col>
                <Col xs={2}>
                    <Panel className="gc-center">
                        <BookingForm />
                        <hr/>
                        <Button bsStyle="primary" bsSize="small" className="gc-button gc-margin-top" block>Contact </Button>
                        <Button bsStyle="default" bsSize="small" className="gc-button gc-margin-top gc-margin-bottom" block>Add to Favourites </Button>
                        <Link>Share</Link>
                    </Panel>
                </Col>
            </div>
        )
    }
});
module.exports = Profile;