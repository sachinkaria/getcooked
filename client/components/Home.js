import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/public';
import ListItem from './chefs/ListItem';
import primaryBackground from '../images/home/background.jpg';

class Home extends React.Component {
  componentWillMount() {
    this.props.listChefs();
  }

  render() {
    const chefs = this.props.chefs.slice(0, 3);
    localStorage.token && browserHistory.push('/chefs');
    return (
      <div>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <section className="section-main">
              <h1 className="text-left gc-title">Get Cooked</h1>
              <h2 className="text-left gc-heading">Cater your events with the coolest chefs around.</h2>
              <div className="gc-margin-bottom gc-padding-none">
                <div className="gc-center">
                  <h3 className="gc-profile-text-md gc-bold gc-margin-bottom--lg">Featured Caterers</h3>
                  <Row className="gc-margin-bottom--sm">
                    {
                      (chefs.length > 0) &&
                      chefs.map(chef => (
                        <ListItem
                          isHome
                          id={chef._id}
                          key={chef._id}
                          profilePhoto={chef.profilePhoto}
                          name={chef.displayName}
                          rating={chef.rating}
                          tagLine={chef.tagLine}
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
                        <Button block className="gc-btn gc-btn--orange gc-btn--search gc-margin-bottom--lg">
                          View more
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </div>
            </section>
            <hr />
            <section>
              <h2 className="gc-section-heading">How it works</h2>
              <Row>
                <Col sm={6} smPush={6} className="text-center">
                  <img alt="Find a caterer" src="/images/search.png" />
                </Col>
                <Col sm={6} smPull={6}>
                  <h3 className="gc-profile-text-md gc-bold">
                    1. Find a Caterer
                  </h3>
                  <p className="gc-text">
                    Our collection of profiles make it easy to find a great caterer or private chef for your event.
                    Compare their photos, ratings, reviews and more.
                  </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col className="text-center" sm={6}>
                  <img alt="Send a booking request" src="/images/event.png" />
                </Col>
                <Col sm={6}>
                  <h3 className="gc-profile-text-md gc-bold">
                    2. Send a booking request
                  </h3>
                  <p className="gc-text">
                    Simply fill out the details of your event and the caterer will get in touch!
                  </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col className="text-center" sm={6} smPush={6}>
                  <img alt="Design your menu" src="/images/ingredients.png" />
                </Col>
                <Col sm={6} smPull={6}>
                  <h3 className="gc-profile-text-md gc-bold">
                    3. Design your menu
                  </h3>
                  <p className="gc-text">
                    Directly interact with your caterer to plan and design your menu.
                  </p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col className="text-center" sm={6}>
                  <img alt="Share and enjoy food" src="/images/bell.png" />
                </Col>
                <Col sm={6}>
                  <h3 className="gc-profile-text-md gc-bold">
                    4. Share and enjoy food
                  </h3>
                  <p className="gc-text">
                    Share and enjoy food with your guests anytime, anywhere.
                  </p>
                </Col>
              </Row>
            </section>
            <hr />
            <section className="gc-margin-bottom--lg">
              <Row>
                <Col sm={6} smPush={6}>
                  <img style={{ width: '100%', 'paddingTop': '15px' }} alt="Cater events around you" src="/images/catering.jpg" />
                </Col>
                <Col sm={6} smPull={6}>
                  <h2 className="gc-section-heading gc-padding-none">Are you a caterer?</h2>
                  <p className="gc-text">
                    Plan, organise and share food at events around London.
                    Connect and design your menu with event hosts around you.
                    Receive bookings for events directly
                    through our platform and share your food.
                  </p>
                  <Row>
                    <Col sm={8}>
                      <Button block className="gc-btn gc-btn--orange gc-margin-top--lg">
                        Find out more
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
;

function mapStateToProps(state) {
  return { chefs: state.public.chefs };
}

export default connect(mapStateToProps, actions)(Home);

