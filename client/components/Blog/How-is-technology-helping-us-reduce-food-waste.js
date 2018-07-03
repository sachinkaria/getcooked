/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/food-waste.jpg';
import { POSTS } from '../../utils/data';
import ListItem from './ListItem';


function Blockchain() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>How is technology helping us reduce food waste? | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/how-is-technology-helping-us-reduce-food-waste" />
        <meta
          name="description"
          content="Did you know that roughly one third of all food produced is either lost or wasted? This amounts
          to around 1.3 billion tonnes of food every single year."
        />
        <meta
          property="og:description"
          content="Did you know that roughly one third of all food produced is either lost or wasted? This amounts
          to around 1.3 billion tonnes of food every single year."
        />
        <meta property="og:image" alt="how is technology helping us reduce food waste" content="https://www.getcooked.co/images/food-waste.jpg" />
        <meta property="og:url" content="https://www.getcooked.co/blog/how-is-technology-helping-us-reduce-food-waste" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">How is Technology Helping Us Reduce Food Waste?</h1>
              <p className="gc-text gc-text--lg gc-grey">25th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="food waste"
                src="/images/food-waste.jpg"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                Did you know that
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="http://www.fao.org/save-food/resources/keyfindings/en/"> roughly one third of all food produced is either lost or wasted? </a>
                This amounts to around 1.3 billion tonnes of food every single year. Fruits and
                vegetables are the most wasted food with almost half being wasted yearly.
                Technology companies are now entering this space with solutions for reducing the
                food that is lost, thrown away or otherwise wasted. All parts of the supply chain
                as well as end consumers are benefiting from some of these solutions and here’s a
                few examples of how they&#39;re doing it!
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  OLIO
              </h2>
              <p className="gc-text gc-text--lg">
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="https://olioex.com/">OLIO</a> connects
                neighbours with each other and with local shops giving them the opportunity to share surplus
                food that would otherwise be thrown away. As well as tackling the problem of unused household items being
                thrown away it also enables people who care about food waste and environment to connect with each other
                and their community. OLIO have to date shared over 400,000 food items with over 250,000 users currently
                operating in 41 countries.
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  Too Good To Go
              </h2>
              <p className="gc-text gc-text--lg">
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="https://toogoodtogo.co.uk/">TGTG</a> focuses
                on providing stores with a platform to sell their surplus food at a lower cost. Users
                are able to select the store they would like a meal from and collect it in a designated time slot.
                TGTG have launched in 8 countries and are planning on expanding their services to a whole load more.
                With over 5,000 stores already signed up they have rescued over 2.5 millions meals.
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  ODDBOX
              </h2>
              <p className="gc-text gc-text--lg">
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="https://www.oddbox.co.uk/">ODDBOX </a>
                gives wonky and odd looking fruit and vegetables a second chance. Shops and supermarkets
                reject oddly grown produce which can amount upto 20-40% of the total produced! ODDBOX delivers boxes of
                delicious misshapen fruit and veg directly to your door. They are now delivering over 25,000 boxes
                across London giving that produce the chance for us to eat.
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  Bio-bean
              </h2>
              <p className="gc-text gc-text--lg">
                The UK produces 500,000 tonnes of waste coffee ground a year. As well as being an emitter of methane
                when dumped into landfills, ground coffee is a common contaminant that can render other materials
                un-recyclable if in contact with them. <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="http://www.bio-bean.com/">Bio-bean </a>
                is a waste startup that was founded in 2013 to
                pickup and re-use ground coffee. They currently use these grounds to produce biofuel in the form
                of coffee logs that can be used in your home. Bio-bean now collects around 3000 tonnes of waste
                coffee grounds a year just from its partnership with Costa coffee saving 360 tonnes of CO2e from
                entering the atmosphere!
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  Winnow Solutions
              </h2>
              <p className="gc-text gc-text--lg">
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="http://www.winnowsolutions.com/">Winnow Solutions </a>
                have recently released a kind-of smart weight meter that gets attached to your food
                waste bin. As you dispose of food waste, you can tell the system via the a tablet what type of food
                is being disposed of to get a sense of the monetary value being lost. This has proven to increase
                the efficiency of kitchens by reducing the amount of food waste produced while simultaneously reducing their costs.
                Winnow Systems have partnered up with the likes of Hilton Dubai, Ikea Belgium, Costa Cruises and
                many more to help effectively reduce the amount of food waste being generated in their kitchens.
              </p>
              <h2 className="gc-profile-text-md gc-bold">
                  Mimica
              </h2>
              <p className="gc-text gc-text--lg">
                <a className="gc-orange" rel="noopener noreferrer" target="_blank" href="https://www.mimicalab.com/">Mimica</a> Labs are
                creating a different kind of food label that can accurately tell you whether
                the food item inside that packaging is fresh or not. Using their patented label the ‘Mimica Touch’,
                they are setting out to help consumers save more and waste less. The Mimica Touch mimics the way food
                reacts to the conditions it&#39;s stored in and degrades in the same way your food does! Since food
                expiry dates are just an estimation of when an item might go off, they don’t consider variables
                like temperature, light and other storage conditions.
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12}>
              <h2 className="gc-profile-text-md gc-bold">Similar posts</h2>
              <ListItem
                title={POSTS[3].title}
                image={POSTS[3].image}
                src={POSTS[3].src}
                date={POSTS[3].date}
              />
              <ListItem
                title={POSTS[2].title}
                image={POSTS[2].image}
                src={POSTS[2].src}
                date={POSTS[2].date}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Blockchain;

