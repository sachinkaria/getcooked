/**
 * Created by sachinkaria on 27/02/2017.
 */
import React from 'react';
import { Button, FormGroup, InputGroup, FormControl, Form } from 'react-bootstrap';

let Search = () => {
    return (
            <Form inline>
                <FormGroup>
                    <InputGroup bsSize="large">
                        <FormControl
                            type="text"
                            placeholder="Search by place, event, cuisine..."
                            className="gc-searchbar"
                        />
                    </InputGroup>
                    <Button bsSize="large" className="gc-btn-search" >Search</Button>
                    <FormControl.Feedback />
                </FormGroup>
            </Form>
        )
};

export default Search;