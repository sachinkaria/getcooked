var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navbar = require('react-bootstrap').Navbar;
var Form = require('react-bootstrap').Form;
var classNames = require('classnames');
var Search = require('./Search');

class Navigation extends React.Component {
  render() {
      return (
          <body>
              <Navbar bsSize="lg" className="gc-navbar">
                  <Navbar.Header>
                      <Navbar.Brand>
                          <img className="gc-logo-default gc-padding-small" href="#" src="images/logo-icon.png"/>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                  </Navbar.Header>
                  <Form inline>
                      <Search />
                  </Form>
              </Navbar>
              {this.props.children}
          </body>
            )
         }
    }

module.exports = Navigation;