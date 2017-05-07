import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Form, FormControl, FormGroup, InputGroup, Button } from 'react-bootstrap';

let SearchBar = React.createClass({
     render: function(){
         return (
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
                            <Button bsSize="large" className="gc-btn gc-btn--orange gc-btn-primary-lg gc-btn-radius-right" block>Search</Button>
                         </Link>
                     </FormGroup>
                 </Form>
                 </div>
         )
     }
});

export default SearchBar;

