var React = require('react');
var PropTypes = React.PropTypes
var Jumbotron = require('react-bootstrap').Jumbotron;
var Col = require('react-bootstrap').Col;
var Image = require('react-bootstrap').Image;
// var StarRatingComponent = require('react-star-rating-component');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var ProfileSummary = (props) => {

    return (
            <Col xs={6} md={3}>
                <Link to='/profile'>
                <Jumbotron className='gc-padding-none gc-center'>
                    <Image className='gc-padding-none' src={props.imageUrl} thumbnail />
                        <h3>{props.firstname} {props.surname}</h3>

                    {props.endorsements.map(function(endorsement){
                        return <h4 key={endorsement}>{endorsement}</h4>;
                        })
                    }
                    {/*<div style={{fontSize: 24}}>*/}
                        {/*<StarRatingComponent*/}
                            {/*name="rate1"*/}
                            {/*starCount={5}*/}
                            {/*value={props.rating}*/}
                        {/*/>*/}
                    {/*</div>*/}
                </Jumbotron>
                </Link>
            </Col>
    )
};

ProfileSummary.propTypes = {
    firstname: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    endorsements: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired
};

module.exports = ProfileSummary;