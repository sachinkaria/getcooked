/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Post() {
  return (
    <section className="gc-section">
      <Row>
        <Col xs={8} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">7 things to consider when choosing a caterer</h1>
              <p className="gc-text gc-text--lg gc-grey">4th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Cater events around you"
                src="/images/dinner.jpg"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                When planning an event, you need a plan of attack when booking caterers (especially
                if food and service is a big part of your event). Different caterers will have different
                requirements and capabilities, and you need to know what you need from them versus what they can
                deliver.
              </p>
              <p className="gc-text gc-text--lg">
                Below are 7 things you should think about while booking a caterer:
              </p>
              <h2 className="gc-profile-text-md gc-bold">Consider your catering requirements before you start looking</h2>
              <p className="gc-text gc-text--lg">
                Although most experienced caterers will be able to assist you with this step,
                it’s a good idea for you to make a list of what you’ll
                require on the day. Are there any special dietary requirements you’ll need to cater for?
                Will there be children in attendance? Will it be buffet catering or sit-down catering? Do you need alcohol?
              </p>
              <h2 className="gc-profile-text-md gc-bold">Know what kind of venue you’ll be hosting in</h2>
              <p className="gc-text gc-text--lg">
                Know where you’re hosting your event and check if the venue allows outside catering. Does the venue
                have a kitchen or will you require mobile catering? Check what type of prep facilities are available.
                Know if you need any additional glassware, tableware or any additional deco.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Plan your budget</h2>
              <p className="gc-text gc-text--lg">
                Plan your total budget and the per head budget you have in mind.
                The per head budget will give you a good idea of the quality and quantity of food,
                drink and service you expect for each person at your event. There can be a major difference
                between a £30 and £80 per head budget.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Know what additional services you require</h2>
              <p className="gc-text gc-text--lg">
                Do you need waiting staff? Are you planning on having alcohol and a bar? Depending on
                what type of event you’re hosting you may likely need some extra services. Know whether
                your caterer is able to provide these additional services or whether you’ll have to book
                them separately.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Go try the food</h2>
              <p className="gc-text gc-text--lg">
                The last thing you want at your event is terrible food – so get out there and
                try it! Visit the restaurant or food truck, or if they’re a professional catering
                business you can always schedule a tasting. This will give you a much better idea of what will
                have at your event.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Ask about their experience</h2>
              <p className="gc-text gc-text--lg">
                Check out their profiles, websites and social media channels. Ask them
                about events they have catered in the past. You need to figure out if they
                can handle what you’re asking of them and if they’ve done similar events in the past.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Check out their sources</h2>
              <p className="gc-text gc-text--lg">
                Be sustainable and expect the same from the people you work with.
                Where does your caterer get their produce from? Is it fresh and sustainably
                produced? Check out some of the sources they get their produce from just to ensure
                you’re aware of where it’s all coming from.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Post;

