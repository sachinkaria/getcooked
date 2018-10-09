import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import MainSection from '../MainSection';
import { LandingPage } from '../../../utils/meta';
import { listChefs } from '../../../actions/public';
import { createEvent } from '../../../actions/events';
import MetaHeader from '../../MetaHeader';
import FeaturedCaterers from '../FeaturedCaterers';
import TextAndImage from '../TextAndImageSection';
import Services from '../Services';

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

    const TEXT_SECTION_COPY = {
      heading: 'London\'s Finest Caterers',
      text: [
        'Feeling indecisive about making those crucial decisions? Canapés and Cocktails or Champagne? Outdoor Buffet or BBQ? 3 or 4 courses? We are here to help! Let us take care of you and your guests when it comes to designing and delivering your wedding menu.',
       'Whether it\'s a 3-day fiesta or an all night Cèilidh our range of bespoke caterers would love to keep your guests from going hungry. Get a range of quotes from some of the best professional and sustainable catering companies in the UK and start planning your menu!'
      ],
      imageAlt: 'Wedding Catering',
      imageUrl: '/images/wedding-2.jpg',
      button: true
    };

    const META = LandingPage.weddings;
    const CHEFS = _.filter(this.props.chefs, (chef) => {
      return chef.events.includes('weddings')
    });

    return (
      <div>
        <MetaHeader {...META} />
        <MainSection
          {...COPY}
          onSubmit={this.props.createEvent}
        />
        <FeaturedCaterers chefs={CHEFS.slice(0, 3)} title="Featured Wedding Caterers" />
        <TextAndImage grey onSubmit={this.props.createEvent} {...TEXT_SECTION_COPY} />
        <Services />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefs: state.public.chefs
  };
}

export default connect(mapStateToProps, { listChefs, createEvent })(WeddingServices);
/**
 * Created by sachinkaria on 04/10/2018.
 */
