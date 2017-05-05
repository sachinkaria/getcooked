import React from 'react';
import SearchBar from '../containers/SearchBar';
import { Col } from 'react-bootstrap';


let Home = () => {
    return (
        <div>
            <Col sm={8} smOffset={2} >
                <h1 className="gc-pull-left gc-heading">Curate and share food with the coolest chefs around.</h1>
                <Col sm={10} smOffset={1} md={8} mdOffset={1} className="gc-margin-bottom gc-padding-none">
                    <SearchBar />
                </Col>
            </Col>
        </div>
    )
};

export default Home;
