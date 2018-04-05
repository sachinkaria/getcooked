import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions/public';
import Main from './Main';
import HowItWorks from './HowItWorks';
import WhoWeAre from './WhoWeAre';
import AreYouACaterer from './AreYouACaterer';

class Home extends React.Component {
  componentWillMount() {
    this.props.listChefs();
  }

  render() {
    const chefs = _.shuffle(this.props.chefs).slice(0, 3);
    return (
      <div>
        <Main chefs={chefs} />
        <br />
        <HowItWorks />
        <br />
        <WhoWeAre />
        <br />
        <AreYouACaterer />
      </div>
    );
  }
}
;

function mapStateToProps(state) {
  return { chefs: state.public.chefs };
}

export default connect(mapStateToProps, actions)(Home);

