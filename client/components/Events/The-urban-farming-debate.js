/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Col, Panel } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.jpg';
import CoverPhoto from '../../components/chefs/profile/CoverPicture';

function BookingACaterer() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Supper Club x The Urban Farming Debate | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/events/supper-club-the-urban-farming-debate" />
        <meta
          name="description"
          content="Join us for an evening of delicious food, cocktails and an insight into the advantages and disadvantages
of the rise of Urban Farming."
        />
        <meta
          property="og:description"
          content="Join us for an evening of delicious food, cocktails and an insight into the advantages and disadvantages
of the rise of Urban Farming."
        />
        <meta
          property="og:image"
          alt="Supper Club"
          content="https://www.getcooked.co/images/event-poster.jpg"
        />
        <meta
          property="og:url"
          content="https://www.getcooked.co/events/supper-club-the-urban-farming-debate"
        />
      </Helmet>
      <CoverPhoto photoUrl={'/images/event-poster.jpg'} />
      <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-heading gc-margin-top">The Urban Farming Debate + Guests</h1>
              <Row className="gc-margin-bottom">
                <Col xs={12} sm={6}>
                  <img
                    className="gc-icon"
                    alt="budget"
                    src="/images/calendar-grey.png"
                  />
                  <p className="gc-text gc-text--lg gc-inline-block">26th September 2018</p>
                  <br/>
                  <img
                    className="gc-icon"
                    alt="time"
                    src="/images/clock-grey.png"
                  />
                  <p className="gc-text gc-text--lg gc-inline-block">7pm - 10:30pm</p>
                  <br/>
                  <img
                    className="gc-icon"
                    alt="budget"
                    src="/images/location-grey.png"
                  />
                  <p className="gc-text gc-text--lg gc-inline-block">Lassco Ropewalk, London, SE1 3PA</p>
                </Col>
                <Col xs={6} xsOffset={3} sm={4} smOffset={0}>
                  <a
                    rel="nooopener noreferer"
                    target="_blank"
                    href="https://www.thirdspacecanteen.com/tickets-26th-sept"
                  >
                    <Button block className="gc-btn gc-btn--orange gc-margin-top gc-margin-bottom">
                      Buy Tickets
                    </Button>
                  </a>
                </Col>
              </Row>
              <p className="gc-text gc-text--lg">
                Get Cooked present our first collaborative Supper Club with Third Space Canteen as part
                of the London Food Link&#39;s Urban Food Fortnight. Come and join us for a very special evening
                of delicious food, wonderful company and a chance to explore the complex issues
                around Urban Farming and it&#39;s recent rise into the spotlight.
              </p>
              <p className="gc-text gc-text--lg">
                Guest speakers include:
              </p>

              <ul className="gc-list">
                <li className="gc-text gc-text--lg">
                  Kate Hofman of <a className="gc-orange" href="https://www.growup.org.uk/">GrowUp Urban Farms</a>
                </li>
                <li className="gc-text gc-text--lg">
                  Jamie Borrows of <a className="gc-orange" href="https://minicrops.com/">MiniCrops</a>
                </li>
                <li className="gc-text gc-text--lg">
                  Sinead Fenton of <a className="gc-orange" href="https://audaciousveg.org/">Audacious Veg</a>
                </li>
              </ul>
              <p className="gc-text gc-text--lg">
                We&#39;ll be hosting a short pre-dinner debate and our guest speakers will then join you for discussion
                during the meal. The menu includes a FREE COCKTAIL otherwise this is a BYOB event.
              </p>
              <Row>
                <Col xs={12} sm={10} smOffset={1}>
                  <div className="gc-center">
                    <p className="gc-text gc-text--xl">
                      <hr />
                      <p className="gc-text gc-text--xl gc-bold">
                        Menu by <Link className="gc-link-default gc-orange" to="/caterers/profile/5ab9047e391c87001486abc9">Country City Catering</Link>
                      </p>
                      <hr />
                      <p className="gc-text text-uppercase">
                        ~ Starter ~
                      </p>
                      <p className="gc-text gc-text--xl gc-bold text-uppercase">
                        Stuffed Sweet Pepper
                      </p>
                      <p className="gc-text gc-grey">
                        Roasted sweet pepper, tomato, olive & basil compote, macadamia nut gazpacho
                      </p>
                      <hr />
                      <p className="gc-text text-uppercase">
                        ~ Main Course ~
                      </p>
                      <p className="gc-text gc-text--xl gc-bold text-uppercase">
                        Dressed Pumpkin (vegan)
                      </p>
                      <p className="gc-text gc-grey">
                        Roasted pumpkin, chili & pumpkin jam, macadamia nut milk, hazelnut pesto & basil oil
                      </p>
                      <p className="gc-text">
                        OR
                      </p>
                      <p className="gc-text gc-text--xl gc-bold text-uppercase">
                        Pigeon & Quinoa (non-vegetarian)
                      </p>
                      <p className="gc-text gc-grey">
                        Half a pigeon, dressed quinoa, honey glazed vegetables, candy beetroot & morel mushrooms stuffed with
                        offal
                      </p>
                      <hr />
                      <p className="gc-text text-uppercase">
                        ~ Dessert ~
                      </p>
                      <p className="gc-text gc-text--xl gc-bold text-uppercase">
                        Apple Parfait
                      </p>
                      <p className="gc-text gc-grey">
                        Frozen apple parfait with a blackberry centre on a sable base
                      </p>
                      <hr />
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default BookingACaterer;

