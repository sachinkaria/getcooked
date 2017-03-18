/**
 * Created by sachinkaria on 27/02/2017.
 */
var React = require('react');
var Button = require('react-bootstrap').Button;
var FormGroup = require('react-bootstrap').FormGroup;
var InputGroup = require('react-bootstrap').InputGroup;
var FormControl = require('react-bootstrap').FormControl;
var Form = require('react-bootstrap').Form;

var Search = () => {
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

module.exports = Search;
