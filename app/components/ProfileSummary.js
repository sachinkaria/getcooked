let React = require('react');
let PropTypes = React.PropTypes;
let Col = require('react-bootstrap').Col;
let Thumbnail = require('react-bootstrap').Thumbnail;
let Row = require('react-bootstrap').Row;
let ReactRouter = require('react-router');
let Link = ReactRouter.Link;

let ProfileSummary = (props) => {
    let styles = {
            backgroundImage: 'url(' + props.imageUrl + ')',
        };

    return (
            <Col xs={6} md={3}>
                <Link to={'/profile/' + props.id }>
                        <Thumbnail className='gc-profile-thumbnail img-responsive' style={ styles }>
                               <Row>
                                   <div className="gc-profile-infobox">
                                       <Col xs={10} xsOffset={1}>
                                       <h3 className="gc-profile-heading-sm gc-text-white">{props.name}</h3>
                                            {props.endorsements.map(function(endorsement){
                                                return <h4 className="gc-profile-text-xs gc-text-white" key={endorsement}>{endorsement}</h4>;
                                            })
                                            }
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
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    endorsements: PropTypes.array.isRequired,
    rating: PropTypes.number.isRequired
};

module.exports = ProfileSummary;