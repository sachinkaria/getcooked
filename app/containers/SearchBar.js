import React from 'react';
import Search from './../components/Search';
import DatePicker from './DatePicker';
import { Col } from 'react-bootstrap';

let SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={12} sm={8} smOffset={2} className="gc-margin-bottom">
                 <Col xs={6}>
                    <Search />
                 </Col>
                 <Col xs={4}>
                    <DatePicker />
                 </Col>
             </Col>
         )
     }
});

export default SearchBar;

