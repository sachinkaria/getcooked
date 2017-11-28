import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { hashHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/public';
import ListItem from './chefs/ListItem';
import primaryBackground from '../images/home/background.jpg';

class Home extends React.Component {
  componentWillMount() {
    this.props.listChefs();
  }

  render() {
    const chefs = this.props.chefs.slice(0,3);
    localStorage.token && hashHistory.push('/chefs');
    return (
      <div>
        <section
          className="section-main"
        >
          <Row>
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} >
              <h1 className="text-left gc-title">Get Cooked</h1>
              <h2 className="text-left gc-heading">Cater your events with the coolest chefs around.</h2>
              <Col className="gc-margin-bottom gc-padding-none">
                <Row className="gc-center">
                  <Col>
                    <h4 className="gc-profile-text-md gc-bold gc-margin-bottom--lg">Featured Chefs</h4>
                    <Row className="gc-margin-bottom--sm">
                      {
                        chefs.map(chef => (
                          <ListItem
                            isHome
                            id={chef._id}
                            key={chef._id}
                            profilePhoto={chef.profilePhoto}
                            name={chef.displayName}
                            rating={chef.rating}
                            endorsements={chef.endorsements}
                            numberOfReviews={chef.numberOfReviews}
                            serviceType={chef.serviceType}
                          />
                        ))
                      }
                    </Row>
                    <Row>
                      <Col sm={4} smOffset={4}>
                        <Link to={'/chefs'}>
                          <Button block className="gc-btn gc-btn--orange gc-btn--search" >
                            View more
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { chefs: state.public.chefs };
}

export default connect(mapStateToProps, actions)(Home);

