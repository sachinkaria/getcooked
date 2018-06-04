/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/carrots.jpg';


function SustainableCatering() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>What is sustainable catering? | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/7-things-to-consider-when-booking-a-caterer" />
        <meta name="description" content="What determines a sustainable caterer? Food and dinnerware contributes as an significant source of waste." />
        <meta property="og:description" content="What determines a sustainable caterer? Food and dinnerware contributes as an significant source of waste." />
        <meta property="og:image" alt="What is sustainable catering" content="https://www.getcooked.co/images/carrots.jpg" />
        <meta property="og:url" content="https://www.getcooked.co/blog/what-is-sustainable-catering" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">What is sustainable catering?</h1>
              <p className="gc-text gc-text--lg gc-grey">4th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Booking a caterer"
                src="/images/carrots.jpg"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                What determines a sustainable caterer? Food and dinnerware contributes as an significant source of
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
                Conventional farming methods that don’t require the use of chemicals can help maintain soil
                quality and reduce harmful pollutants. Organically grown herbs, fruits, vegetables and meat
                can help keep farms healthy. Meals should be catered using mostly certified organic ingredients
                that coincide with international organic standards. You can always ask your caterer for their certified sources.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Reusable, Recyclable and Biodegradable tableware</h2>
              <p className="gc-text gc-text--lg">
                Sustainable catering also means reducing material waste. With plastic being one of the worlds biggest
                environmental issues it’s important that tableware, glassware and any other materials used
                are either biodegradable or recyclable (if they’re single use) or completely reusable. With large events such as
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
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default SustainableCatering;

