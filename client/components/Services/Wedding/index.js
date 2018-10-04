import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import MainSection from '../MainSection';
import { listChefs } from '../../../actions/public';
import FeaturedCaterers from '../FeaturedCaterers';

class WeddingServices extends Component {
  constructor(props) {
    super(props);
    this.state = { chefs: this.props.chefs || [] }
  }

  componentWillMount() {
    this.props.listChefs();
  }

  render() {
    const COPY = {
      title: 'Wedding Catering',
      subtitle: 'Book Amazing Wedding Caterers For Your Special Day',
      image: '/images/wedding.jpg'
    };
    const CHEFS = _.filter(this.props.chefs, (chef) => {
      return chef.events.includes('weddings')
    });

    return (
      <div>
        <MainSection
          {...COPY}
          eventSubmit={(event) => console.log(event)}
        />
        <FeaturedCaterers chefs={CHEFS} title="Featured Wedding Caterers" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefs: state.public.chefs
  };
}

export default connect(mapStateToProps, { listChefs })(WeddingServices);
/**
 * Created by sachinkaria on 04/10/2018.
 */
