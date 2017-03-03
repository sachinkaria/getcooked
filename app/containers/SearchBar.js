let React = require('react');
let Search = require('./../components/Search');
let Col = require('react-bootstrap').Col;

let SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={8} xsOffset={2} className="gc-margin-bottom">
                 <div>
                    <Search/>
                 </div>
             </Col>
         )
     }
});

module.exports = SearchBar;

