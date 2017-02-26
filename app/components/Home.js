var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navbar = require('react-bootstrap').Navbar;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var Form = require('react-bootstrap').Form;
var InputGroup = require('react-bootstrap').InputGroup;
var Button = require('react-bootstrap').Button;
var classNames = require('classnames');




function Home () {
  return (
        <Navbar bsSize="lg" className="blue" >
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Get Cooked</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
            <Form inline>
                <FormGroup>
                    <InputGroup bsSize="large">
                    <FormControl
                        type="text"
                        placeholder="Enter text"
                    />
                    </InputGroup>
                    <Button bsSize="large" active>Button</Button>
                    <FormControl.Feedback />
                </FormGroup>
            </Form>
        </Navbar>
  )
}

module.exports = Home;