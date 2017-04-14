import React from 'react';
import SearchBar from '../containers/SearchBar';
import { Col } from 'react-bootstrap';


let Home = () => {
    return (
        <div>
            <Col xs={12} sm={10} smOffset={1} >
                <h1 className="gc-pull-left gc-heading">Connect and share food with the coolest chefs around.</h1>
                <SearchBar/>
            </Col>
        </div>
    )
};

export default Home;
