/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.webp';
import { POSTS } from '../../utils/data';
import ListItem from './ListItem';

function BookingACaterer() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>5 Bespoke Wedding Caterers in London | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/7-things-to-consider-when-booking-a-caterer" />
        <meta name="description" content="Weddings are all about celebrating love and " />
        <meta property="og:description" content="When planning an event, you need a plan of attack to choose and book a caterer - especially if food and service is a big part of your event." />
        <meta property="og:image" alt="7 things to consider when booking a caterer" content="https://scontent.flhr4-1.fna.fbcdn.net/v/t1.0-9/35238522_603932340005662_7642992469004517376_n.webp?_nc_cat=0&oh=2262eddcb82de17c848a3a143326336d&oe=5BB0E837" />
        <meta property="og:url" content="https://www.getcooked.co/blog/7-things-to-consider-when-booking-a-caterer" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">7 Things to Consider When Booking a Caterer</h1>
              <p className="gc-text gc-text--lg gc-grey">4th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Booking a caterer"
                src="/images/catering-3.webp"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                Are you planning the menu for your special day? How many courses are you having? Cocktails or Champaigne?
              </p>
              <p className="gc-text gc-text--lg">
                Here are 7 things you should think about when you&#39;re choosing and booking a caterer:
              </p>
              <h2 className="gc-profile-text-md gc-bold">1. Consider your catering requirements before you start looking</h2>
              <p className="gc-text gc-text--lg">
                Although most experienced caterers will be able to assist you with this step,
                it&#39;s a good idea for you to make a list of what you&#39;ll
                require on the day. Are there any special dietary requirements you&#39;ll need to cater for?
                Will there be children in attendance? Will it be buffet catering or sit-down catering? Do you need alcohol?
              </p>
              <h2 className="gc-profile-text-md gc-bold">2. Know what kind of venue you&#39;ll be hosting in</h2>
              <p className="gc-text gc-text--lg">
                Know where you&#39;re hosting your event and check if the venue allows outside catering. Does the venue
                have a kitchen or will you require mobile catering? Check what type of prep facilities are available.
                Know if you need any additional glassware, tableware or any additional deco.
              </p>
              <h2 className="gc-profile-text-md gc-bold">3. Plan your budget</h2>
              <p className="gc-text gc-text--lg">
                Plan your total budget and the per head budget you have in mind.
                The per head budget will give you a good idea of the quality and quantity of food,
                drink and service you expect for each person at your event. There can be a major difference
                between a £30 and £80 per head budget. Also make sure you remember to include VAT when estimating budgets.
              </p>
              <br/>
              <Row className="gc-margin-top--lg gc-margin-bottom--lg">
                <Col xs={10} xsOffset={1} sm={4} smOffset={4}>
                  <div className="gc-center">
                    <Link to={'/'}>
                      <Button block className="gc-btn gc-btn--orange gc-btn--lg">
                        Get Quotes
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <br/>
              <h2 className="gc-profile-text-md gc-bold">4. Know what additional services you require</h2>
              <p className="gc-text gc-text--lg">
                Do you need waiting staff? Are you planning on having alcohol and a bar? Depending on
                what type of event you&#39;re hosting you may likely need some extra services. Know whether
                your caterer is able to provide these additional services or whether you&#39;ll have to book
                them separately.
              </p>
              <h2 className="gc-profile-text-md gc-bold">5. Go try the food</h2>
              <p className="gc-text gc-text--lg">
                The last thing you want at your event is terrible food – so get out there and
                try it! Visit the restaurant or food truck, or if they&#39;re a professional catering
                business you can always schedule a tasting. For larger events like weddings you will likely have a
                few tasting sessions before committing.
              </p>
              <h2 className="gc-profile-text-md gc-bold">6. Ask about their experience</h2>
              <p className="gc-text gc-text--lg">
                Check out their profiles, websites and social media channels. Ask them
                about events they have catered in the past. You need to figure out if they
                can handle what you&#39;re asking of them and if they&#39;ve done similar events in the past.
              </p>
              <h2 className="gc-profile-text-md gc-bold">7. Check out their sources</h2>
              <p className="gc-text gc-text--lg">
                Be sustainable and expect the same from the people you work with.
                Where does your caterer get their produce from? Is it fresh and sustainably
                produced? Check out some of the sources they get their produce from just to ensure
                you&#39;re aware of where it&#39;s all coming from.
              </p>
              <br />
              <Row className="gc-margin-top--lg gc-margin-bottom--lg">
                <Col xs={10} xsOffset={1} sm={4} smOffset={4}>
                  <div className="gc-center">
                    <Link to={'/'}>
                      <Button block className="gc-btn gc-btn--orange gc-btn--lg">
                        Get Quotes
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
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
                title={POSTS[3].title}
                image={POSTS[3].image}
                src={POSTS[3].src}
                date={POSTS[3].date}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default BookingACaterer;

