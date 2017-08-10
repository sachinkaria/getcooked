import React from 'react';
import SearchBar from './SearchBar';
import { Col } from 'react-bootstrap';
import { hashHistory } from 'react-router';


const Home = () => {
  localStorage.token && hashHistory.push('/chefs');
  return (
    <div>
      <Col sm={8} smOffset={2} >
        <h1 className="gc-pull-left gc-heading">Curate and share food with the coolest chefs around.</h1>
        <Col sm={12} smOffset={0} md={10} mdOffset={1} className="gc-margin-bottom gc-padding-none">
          <SearchBar />
        </Col>
      </Col>
    </div>
  );
};

export default Home;
