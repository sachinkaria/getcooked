/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.webp';
import { POSTS } from '../../utils/data';
import ListItem from './ListItem';

function BookingACaterer() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>5 Things To Consider When Planning Your Catering Budget | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/5-things-to-consider-when-planning-your-catering-budget" />
        <meta
          name="description"
          content="Planning an event can be overwhelming. If you haven\'t hosted an event before it can always be
                difficult knowing where and how to get started."
        />
        <meta
          property="og:description"
          content="Planning an event can be overwhelming. If you haven\`t hosted an event before it can always be
                difficult knowing where and how to get started."
        />
        <meta property="og:image" alt="5 Things To Consider When Planning Your Catering Budget" content="https://www.getcooked.co/images/tableware.webp" />
        <meta property="og:url" content="https://www.getcooked.co/blog/5-things-to-consider-when-planning-your-catering-budget" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">5 Things To Consider When Planning Your Catering Budget</h1>
              <p className="gc-text gc-text--lg gc-grey">2nd August 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Tableware"
                src="/images/tableware.webp"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                Planning an event can be overwhelming. If you haven&#39;t hosted an event before it can always be
                difficult knowing where and how to get started. Whether it&#39;s your wedding, private dinner
                or corporate party, knowing your budget and planning your food accordingly can be pretty
                tedious, after all, the food and drinks at your event will probably have quite a big
                impact on how much fun everybody ends up having! That&#39;s why we&#39;re here to help you!
                Here are a few considerations that you should keep in mind before planning the food and
                drinks for your next event.
              </p>
              <h2 className="gc-profile-text-md gc-bold">What type of guests are you having at your event?</h2>
              <p className="gc-text gc-text--lg">
                Know your guests. Know how many guests you&#39;re expecting, what type of guests you&#39;re
                expecting and if anybody has any special dietary requirements. A large amount of
                people can significantly increase the overall cost of your event, however, can
                also reduce the per head cost. If there are children who are going to be present
                there will most likely be a different menu for them. Make sure you know how many
                vegans, vegetarians or guests with special dietary requirements are going to be
                in attendance. All of these considerations will affect your menu and separate
                menus for different individuals will require more time and therefore will increase
                the cost of the preparation for your event.
              </p>
              <h2 className="gc-profile-text-md gc-bold">The complexity of your menu will have an impact on execution.</h2>
              <p className="gc-text gc-text--lg">
                The style of food and the complexity of the menu is always a crucial consideration you
                need to bare in mind when planning your event. The costs can be significantly different
                if you&#39;re only planning to have canapes or a barbecue compared to a sit down 5-course
                meal. Think about what type of meal you&#39;d like your guests to have and factor in the
                per head budget you&#39;d like to spend on each guest. Buffets, canapes, platters and
                barbecues can work out a lot simpler while providing a range of options for your
                guests that often cost less than sit-down meals. Your caterer will usually have a
                few great ideas on what they can offer. More complex menus will require a lot more
                preparation time and more hands on deck to pull it off successfully.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Tea, coffee, or cocktails?</h2>
              <p className="gc-text gc-text--lg">
                Once you&#39;re done planning your food menu the next step is to think about your drinks menu.
                This can range from just simple tea and coffee to a full bar service. Naturally, having
                alcoholic drinks at your event will increase the budget. There are a few styles you
                can go with when it comes to the drinks like simply having a selection of wines on
                offer or a choice of two to three mixed drinks or cocktails. Catering companies will
                often be able to provide alcoholic and non-alcoholic beverages for you and it&#39;s
                always a good idea to discuss this with them before you go ahead and finalise
                your budget. Simpler drinks will require less preparation and staff to execute.
                This brings us onto our next point...
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
              <h2 className="gc-profile-text-md gc-bold">Do you need waiting and bar staff to help produce your event?</h2>
              <p className="gc-text gc-text--lg">
                Events often have unique styles and levels of service. More glamorous events will usually require
                some sort of waiting staff to work at the event and walk around handing out drinks, canapes
                or whatever else you have planned. The more complex and fancy your menu is, the more
                staff it will require. You must consider the costs of staff when you&#39;re planning
                your budget. Remember that each waiter and waitress will be compensated by the hour.
                Multiply that by the number of hours you expect them to be working (including
                any preparation before and potentially cleaning up after). If you can&#39;t quite
                figure out how much staff you should expect to have, a good place to start is
                to think about the ratio of staff to guests that you would require to successfully produce
                your event. For some full-service events, labor and staff costs may compose up to half of
                your catering budget, while more simple events require significantly less staff. These costs
                are often overlooked during the planning phase so keep this in mind to avoid any unpleasant
                surprises!
              </p>
              <h2 className="gc-profile-text-md gc-bold">Think about what food preparation facilities are available at your venue.</h2>
              <p className="gc-text gc-text--lg">
                If you already know the venue your event is being hosted at and what type of facilities
                they have you will have a good idea if any additional equipment is required. Catering
                companies will often have some equipment like portable barbecues, gas cookers etc.
                that they can set up at your event. Keep in mind that often they have leased that
                equipment or may need to rent it out. This can add additional costs to your event
                that is simply unavoidable. You can potentially rent out the equipment and provide
                it yourself but it&#39;s probably a good idea to let caterers handle this part. As
                well as cooking equipment, you should think about tableware, glassware, table linens,
                chairs etc. These details will make up the finishing touches of your event but can
                often be overlooked. If you do have your own deco and are willing to provide it that
                would save the caterers some time in preparing, transporting and packing up this gear.
              </p>
              <h2 className="gc-profile-text-md gc-bold">A few other factors that can have an impact on the costs.</h2>
              <p className="gc-text gc-text--lg">
                The length of your event will have an obvious impact on the total cost. If you have a
                number of staff at the event they will be putting in more work hours and so will the
                catering team. Think about the type of event you&#39;re hosting and whether it already
                has cooking facilities or if there is anything that the catering service should
                provide. The location can also affect whether it&#39;s a worthwhile event for a catering
                company and the further away it is the more incentive they&#39;ll need to make the journey
                to you. Keeping these factors in mind will give you a good benchmark to estimating
                your budget and planning to menu and service for you next event!
              </p>
            </Col>
          </Row>
          <br/>
          <Row>
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
          <hr />
          <Row>
            <Col xs={12}>
              <h2 className="gc-profile-text-md gc-bold">Similar posts</h2>
              <ListItem
                title={POSTS[2].title}
                image={POSTS[2].image}
                src={POSTS[2].src}
                date={POSTS[2].date}
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

export default BookingACaterer;

