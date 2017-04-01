import React from 'react';
import { Col, Form, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';

let SearchBar = React.createClass({
     render: function(){
         return (
             <Col xs={10} xsOffset={1} sm={10} smOffset={2} className="gc-margin-bottom">
                 <Form inline>
                     <FormGroup bsSize="large">
                             <InputGroup bsClass="without-border-radius">
                                 <FormControl
                                     bsClass="gc-input gc-input-search"
                                     type="text"
                                     placeholder="Search by place, event, cuisine..."
                                     className="gc-search-width"
                                 />
                             </InputGroup>
                         <FormControl.Feedback />
                     </FormGroup>
                     <FormGroup>
                         <Button bsSize="large" className="gc-btn-search" block>Search</Button>
                     </FormGroup>
                 </Form>
             </Col>
         )
     }
});

export default SearchBar;

