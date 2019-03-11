/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/carrots.webp';
import { POSTS } from '../../utils/data';
import ListItem from './ListItem';


function SustainableCatering() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>What is sustainable catering? | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/7-things-to-consider-when-booking-a-caterer" />
        <meta name="description" content="What determines a sustainable caterer? Food and dinnerware contributes as an significant source of waste." />
        <meta property="og:description" content="What determines a sustainable caterer? Food and dinnerware contributes as an significant source of waste." />
        <meta property="og:image" alt="What is sustainable catering" content="https://scontent.flhr4-1.fna.fbcdn.net/v/t1.0-9/35265999_603932393338990_4796899555285139456_n.webp?_nc_cat=0&oh=647c4a569390e488f7b31d2142e4575c&oe=5BBDB8EE" />
        <meta property="og:url" content="https://www.getcooked.co/blog/what-is-sustainable-catering" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">What is Sustainable Catering?</h1>
              <p className="gc-text gc-text--lg gc-grey">4th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Booking a caterer"
                src="/images/carrots.webp"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                What determines a sustainable caterer? Food and dinnerware contributes as a significant source of
                waste and there are a few simple practices that can be undertaken by any catering service to ensure
                they are sourcing, preparing, serving and disposing of food and materials in a more sustainable way.
              </p>
              <p className="gc-text gc-text--lg">
                Here are a few of the factors that can be considered:
              </p>
              <h2 className="gc-profile-text-md gc-bold">Locally and sustainably sourced</h2>
              <p className="gc-text gc-text--lg">
                Lower food miles often means a smaller carbon footprint to get the food to your tables.
                Also, supporting local farmers helps maintain regional agricultural production that connects
                urban areas to nearby farming communities. With the resurgence in organic farming and the
                introduction of indoor and urban farming, local produce is becoming more and more accessible
                and affordable. Often caterers will be able to provide seasonal menus featuring locally grown ingredients.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Organic produce</h2>
              <p className="gc-text gc-text--lg">
                Conventional farming methods that don&#39;t require the use of chemicals can help maintain soil
                quality and reduce harmful pollutants. Organically grown herbs, fruits, vegetables and meat
                can help keep farms healthy. Meals should be catered using mostly certified organic ingredients
                that coincide with international organic standards. You can always ask your caterer for their certified sources.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Reusable, Recyclable and Biodegradable tableware</h2>
              <p className="gc-text gc-text--lg">
                Sustainability also means reducing material waste. With plastic being one of the worlds biggest
                environmental issues it&#39;s important that tableware, glassware and any other materials used
                are either biodegradable or recyclable (if they&#39;re single use) or completely reusable. With large events such as
                weddings or corporate events, reducing the amount of material that is contaminated and disposed of is crucial.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Vegan and Vegetarian</h2>
              <p className="gc-text gc-text--lg">
                Vegan and vegetarian catering options do often have a reduced environmental impact compared to
                that which includes meat and in some cases fish. Some of the environmental factors
                negatively associated with meat production are pollution through the use of fossil fuels,
                animal methane and high water and land consumption. Sustainable caterers who
                are flexible on their services will contribute to helping reduce their carbon footprint.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Reducing food waste</h2>
              <p className="gc-text gc-text--lg">
                Minimising both the pre-consumer and post-consumer waste is essential to keep both costs
                low and reducing the amount of food waste at events. Large amounts of pre-consumer food waste
                can also be donated to food banks or food charities efficiently to reduce the amount thrown away.
                Post-consumer food waste should be used for composting and crucial anti-contamination steps
                should be carried out to reduce un-usable food.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Summary</h2>
              <p className="gc-text gc-text--lg">
                Catering companies that engage in some or all of these practices can be considered more sustainable than
                if they don&#39;t. It&#39;s important that when booking a caterer for your events you ask them about where and how they
                source and recycle the food that will eventually be served. Questions regarding seasonal menus, where their ingredients come from,
                and how they prepare and dispose of food will give you a good idea of whether they&#39;re sustainable or not.
              </p>
              <br />
              <h3 className="gc-text gc-text--lg gc-bold">
                Check out and book sustainable and bespoke caterers for your next event <Link to={'/caterers'} activeClassName="gc-orange" className="gc-text gc-text--lg gc-orange">here</Link>.
              </h3>
              <br />
              <h4 className="gc-text gc-text--lg gc-bold">
                Additional resources on this topic
              </h4>
              <ul className="gc-list list-unstyled">
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.gov.uk/government/publications/healthier-and-more-sustainable-catering-a-toolkit-for-serving-food-to-adults">Healthy and Sustainable Catering</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.foodethicscouncil.org/uploads/publications/Catering%20for%20Sustainability_Full_Report(1).pdf">Catering for Sustainability</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://info.lse.ac.uk/staff/services/catering/lse-catering-and-the-environment">Environmental, Sustainable and Healthy Food Policy and Targets</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.ncass.org.uk/mobile-catering-home/content/get-profitable/sustainability-tips-for-caterers">12 Sustainability Tips That Don&#39;t Cost The Earth</a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs={12}>
              <h2 className="gc-profile-text-md gc-bold">Similar posts</h2>
              <ListItem
                title={POSTS[0].title}
                image={POSTS[0].image}
                src={POSTS[0].src}
                date={POSTS[0].date}
              />
              <ListItem
                title={POSTS[1].title}
                image={POSTS[1].image}
                src={POSTS[1].src}
                date={POSTS[1].date}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default SustainableCatering;

