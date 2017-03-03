var React = require('react');
var Search = require('./../components/Search');
let Col = require('react-bootstrap').Col;

var SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={8} xsOffset={2} className="gc-margin-bottom">
                <Search/>
             </Col>
         )
     }
});

module.exports = SearchBar;

