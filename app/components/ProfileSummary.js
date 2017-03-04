let React = require('react');
let PropTypes = React.PropTypes
let Jumbotron = require('react-bootstrap').Jumbotron;
let Col = require('react-bootstrap').Col;
let Thumbnail = require('react-bootstrap').Thumbnail;
let Row = require('react-bootstrap').Row;
let StarRatingComponent = require('react-star-rating-component');
let ReactRouter = require('react-router');
let Link = ReactRouter.Link;

let ProfileSummary = (props) => {
    let styles = {
            backgroundImage: 'url(' + props.imageUrl + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };

    return (
            <Col xs={6} md={3}>
                <Link to={'/profile/' + props.id }>
                        <Thumbnail className='gc-profile-thumbnail img-responsive' style={ styles }>
                               <Row>
                                   <div className="gc-profile-infobox">
                                       <Col xs={10} xsOffset={1}>
                                       <h3 className="gc-profile-heading-white-sm">{props.firstname}</h3>
                                            {props.endorsements.map(function(endorsement){
                                                return <h4 className="gc-profile-text-xs gc-text-white" key={endorsement}>{endorsement}</h4>;
                                            })
                                            }
                                            {/*<StarRatingComponent*/}
                                            {/*name="rate1"*/}
                                            {/*starCount={5}*/}
                                            {/*value={props.rating}*/}
                                            {/*/>*/}
                                        </Col>
                                   </div>
                                </Row>
                        </Thumbnail>
                </Link>
            </Col>
    )
};

ProfileSummary.propTypes = {
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    endorsements: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired
};

module.exports = ProfileSummary;