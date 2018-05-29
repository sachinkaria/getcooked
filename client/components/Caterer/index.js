import React from 'react';
import { Helmet } from 'react-helmet';
import Main from './Main';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Features from './Features';
import Contact from './Contact';

function Caterer() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Join us | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co" />
        <meta name="description" content="Grow your catering business. Receive online bookings to cater events around you." />
        <meta property="og:description" content="Grow your catering business. Receive online bookings to cater events around you." />
      </Helmet>
      <Main />
      <HowItWorks />
      <Pricing />
      <Features />
      <Contact />
    </div>
  );
}

export default Caterer;