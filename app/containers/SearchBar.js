import React from 'react';
import { Col, Form, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';

let SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={12} sm={6} smOffset={2} className="gc-margin-bottom">
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
                         <Button bsSize="large" className="gc-btn-orange gc-btn-primary-lg gc-btn-radius-right" block>Search</Button>
                     </FormGroup>
                 </Form>
                 </div>
             </Col>
         )
     }
});

export default SearchBar;

