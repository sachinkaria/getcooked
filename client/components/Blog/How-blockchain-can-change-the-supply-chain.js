/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/blockchain.jpg';


function Blockchain() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>How Blockchain Can Change the Food Supply Chain | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog/how-blockchain-can-change-the-food-supply-chain" />
        <meta
          name="description"
          content="When it comes to blockchain technology most of us are still curious to see real
                world implications and benefits that it can bring to certain industries."
        />
        <meta
          property="og:description"
          content="When it comes to blockchain technology most of us are still curious to see real
                world implications and benefits that it can bring to certain industries."
        />
        <meta property="og:image" alt="how can blockchain change the food supply chain" content="https://www.getcooked.co/images/blockchaim.jpg" />
        <meta property="og:url" content="https://www.getcooked.co/blog/how-blockchain-can-change-the-food-supply-chain" />
      </Helmet>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          <Row>
            <Col xs={12}>
              <h1 className="gc-section-heading gc-padding-none">How Blockchain Can Change the Food Supply Chain</h1>
              <p className="gc-text gc-text--lg gc-grey">11th June 2018</p>
            </Col>
            <Col xs={12} sm={8} smOffset={2}>
              <img
                style={{ width: '100%', paddingTop: '15px', marginBottom: '25px' }}
                alt="Blockchain"
                src="/images/blockchain.jpg"
              />
            </Col>
            <Col xs={12}>
              <p className="gc-text gc-text--lg">
                When it comes to blockchain technology most of us are still curious to see real
                world implications and benefits that it can bring to certain industries. With solutions
                coming up in industries like pharma and gold production, there are now a number of blockchain
                startups applying themselves to the food space. So how can the food supply chain change with
                the rise of these new technologies?
              </p>
              <p className="gc-text gc-text--lg">
                Here are a few of the factors that can be considered:
              </p>
              <h2 className="gc-profile-text-md gc-bold">Traceability and transparency</h2>
              <p className="gc-text gc-text--lg">
                The blockchain offers consumers and retailers the transparency needed to reassure them that
                the food they eat is produced from where the label says it&#39;s from. Currently identifying sources
                and production methods is problematic. Traceability as well as recall procedures in the food
                sector aren&#39;t reliable and food fraud is common in the supply chain. Blockchain offers immutable
                and unforgeable data tracking and storage of product information at all stages of the supply chain.
                That means when records are entered they can&#39;t be edited, deleted or copied and are passed up the
                supply chain all the way to the consumer. Information collected can include production and growing
                conditions, shipping data, storage conditions and expiry dates. This creates safeguards against
                individuals or companies from altering the data and selling fraudulent products to the consumer
                and creates transparency and authenticity in the industry.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Efficiency</h2>
              <p className="gc-text gc-text--lg">
                Taking the supply chain online can also increase the efficiency of the production,
                storage and transportation of food around the world. Outdated paper based tracking
                systems are inefficient and the pressure to deliver fresh and safe produce is ever
                increasing. With blockchain being able to track and process transactions products can
                be delivered to their destination more effectively. This can significantly reduce
                production and transportation costs as well as reduce food waste. By being able to
                locate where goods are and where they&#39;re supposed to be quickly and accurately through
                an online system can reduce a lot of the inefficient methods that are currently used today.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Food safety</h2>
              <p className="gc-text gc-text--lg">
                Faster detection of problems such as contamination or misplaced goods can also lead to safer food
                for consumers. Issues such as recalls or detection of which stage in the production process led
                to the contamination of a product can take weeks or even months. With the entire supply chain and
                transaction history documented and stored online it can be much easier to accurately detect the
                root of these sort of problems. This increased efficiency can also lead to the reduction of
                contamination incidents and eventually help keep the food on our shelves fresher and healthier.
                If a contaminated product ends up with consumers simply scanning the barcode can give you insight
                into exactly where it&#39;s come from in a matter of seconds.
              </p>
              <h2 className="gc-profile-text-md gc-bold">Going forward</h2>
              <p className="gc-text gc-text--lg">
                The number of companies now entering the blockchain arena is steadily increasing.
                With potential for better communication and collaboration across the entire food
                supply chain, the benefits are potentially huge. There are, however, still constraints
                on just how effective this new technology can be. Is the industry ready for transparency
                or will there be significant resistance from larger corporations? Who enters the information?
                Is the information entered authentic and truthful? Who has access to all the of this information
                and who doesn&#39;t? These questions will inevitably need answering but there is still
                huge potential in the industry. Blockchain technology will without a doubt provide
                the tools to instill trust and transparency into the food industry, however, how we
                implement and use these tools will inevitably decide it&#39;s effectiveness.
              </p>
              <br />
              <h4 className="gc-text gc-text--lg gc-bold">
                Additional resources on this topic
              </h4>
              <ul className="gc-list list-unstyled">
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.newfoodmagazine.com/article/36978/blockchain-can-save-food/">How blockchain can save our food</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.provenance.org/">Provenance</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="http://www.generixgroup.com/en/blog/blockchain-food-supply-chain">Blockchain: What uses for the food supply chain?</a>
                </li>
                <li className="gc-margin-none gc-padding-none gc-text">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.digitaltrends.com/cool-tech/can-blockchain-bring-transparency-to-global-supply-chains/">Can blockchain bring transparency to global supply chains</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Blockchain;

