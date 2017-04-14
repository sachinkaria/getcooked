import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Col, Form, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';

let SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={12} sm={6} smOffset={2} className="gc-margin-bottom gc-padding-none">
                 <div className="gc-input-bar">
                 <Form>
                     <FormGroup bsSize="large" className="gc-input-item">
                             <InputGroup bsClass="without-border-radius">
                                 <FormControl
                                     bsClass="gc-input gc-input--lg gc-input--radius-left"
                                     type="text"
                                     placeholder="Search by place, event, cuisine..."
                                 />
                             </InputGroup>
                         <FormControl.Feedback />
                     </FormGroup>
                     <FormGroup className="gc-input-item">
                         <Link to="search" className="gc-padding-none">
                            <Button bsSize="large" className="gc-btn-orange gc-btn-primary-lg gc-btn-radius-right" block>Search</Button>
                         </Link>
                     </FormGroup>
                 </Form>
                 </div>
             </Col>
         )
     }
});

export default SearchBar;

