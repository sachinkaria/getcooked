let React = require('react');
let Search = require('./../components/Search');
let DatePicker = require('./DatePicker');
let Col = require('react-bootstrap').Col;

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

module.exports = SearchBar;

