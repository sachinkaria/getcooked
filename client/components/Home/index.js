import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { listChefs } from '../../actions/public';
import { createEvent } from '../../actions/events';
import Main from './Main';
import HowItWorks from './HowItWorks';
import WhoWeAre from './WhoWeAre';
import AreYouACaterer from './AreYouACaterer';
import FeaturedCaterers from './FeaturedCaterers';
import Blog from './Blog';

class Home extends React.Component {
  componentWillMount() {
    this.props.listChefs();
  }

  render() {
    const chefs = _.shuffle(this.props.chefs).slice(0, 3);
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cater your events | Get Cooked</title>
          <link rel="canonical" href="https://www.getcooked.co" />
        </Helmet>
        <Main eventSubmit={this.props.createEvent} />
        <br />
        <FeaturedCaterers chefs={chefs} />
        <br />
        <HowItWorks />
        <br />
        <WhoWeAre />
        <br />
        <AreYouACaterer />
        <Blog />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { chefs: state.public.chefs };
}

export default connect(mapStateToProps, { listChefs, createEvent })(Home);

