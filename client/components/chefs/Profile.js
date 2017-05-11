import React from 'react';
import _ from 'lodash';
import LightBox from '../../containers/LightBox';
import Endorsement from '../../containers/Endorsement';
import Review from '../Review';
import Badge from '../Badge';
import Rating from '../Rating';
import ContactForm from '../../containers/ContactForm';
import BookingForm from '../../containers/BookingForm';
import { Col, Panel, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/public';



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.props.getChef(props.params.id);
    }

    renderContent () {
        if (this.props.chef) {
            let user = this.props.chef;
            let id = user._id;
            // let endorsements = _.sortBy(user.endorsements, 'number').reverse();
            let imagesCount = user.images && user.images.length;
            return (
                <div>
                    <Col xs={12} sm={9} md={8} mdOffset={1}>
                        <Panel>
                            <Col xs={12} sm={12} md={4}>
                                <Thumbnail onClick={null} src={user.profilePhoto}/>
                            </Col>
                            <Col xs={12} sm={12} md={8}>
                                <p className="gc-center gc-profile-heading-lg">{user.displayName}</p>
                                <Col xs={12} className="gc-margin-top--lg">
                                    <p className="gc-profile-text-sm">{user.description}</p>
                                </Col>
                            </Col>
                            {imagesCount > 0 && (
                                <Col xs={12}>
                                    <h3 className="gc-center gc-margin-bottom">Photos <span
                                        className="gc-profile-text-xs">({imagesCount})</span></h3>
                                    <LightBox images={user.images}/>
                                </Col>
                            )
                            }
                            {/*<Col xs={12} className="gc-margin-top">*/}
                            {/*<Col xs={12} className="gc-center">*/}
                            {/*<h3>Reviews <span className="gc-profile-text-xs">({user.numberOfRatings})</span></h3>*/}
                            {/*</Col>*/}
                            {/*<Col xs={12} md={8}>*/}
                            {/*{user.reviews.map(function (review) {*/}
                            {/*return (*/}
                            {/*<Review key={review.name} name={review.name}*/}
                            {/*description={review.reviewDescription}/>*/}
                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                            {/*</Col>*/}

                            {/*<Col xs={12} md={4}>*/}
                            {/*{user.ratings.map(function (rating) {*/}
                            {/*return (*/}
                            {/*<Rating key={rating.category} category={rating.category} value={rating.value}/>*/}
                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                            {/*</Col>*/}

                            {/*<Col xs={12} md={4} className="gc-margin-top--lg">*/}
                            {/*{endorsements.map(function (endorsement) {*/}
                            {/*return (*/}
                            {/*<Endorsement key={endorsement.description} description={endorsement.description}*/}
                            {/*number={endorsement.number}/>*/}
                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                            {/*</Col>*/}
                            {/*</Col>*/}
                        </Panel>
                    </Col>
                    <Col sm={3} md={2} xsHidden>
                        <Panel className="gc-center">
                            <BookingForm id={user.id}/>
                            <hr/>
                            <ContactForm chefId={this.props.params.id}/>
                            <Button className="gc-btn gc-btn-blue gc-margin-top gc-margin-bottom" block>Favourite</Button>
                            <Link>Share</Link>
                        </Panel>
                    </Col>
                </div>
            )
        }

    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps (state){
    return { chef: state.public.chef };
}

export default connect(mapStateToProps, actions)(Profile);