var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Navbar = require('react-bootstrap').Navbar;
var Form = require('react-bootstrap').Form;
var classNames = require('classnames');
var Search = require('./Search');
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;


class Navigation extends React.Component {
  render() {
      return (
          <div className="row">
              <Navbar bsSize="lg" className="gc-navbar">
                  <Navbar.Header>
                      <Navbar.Brand>
                          <Link to="/" className="gc-padding-none">
                          <img className="gc-logo-default" href="#" src="images/logo-icon.png"/>
                          </Link>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                  </Navbar.Header>
                  <Nav className="gc-pull-right">
                      <Link>
                          <p className="gc-navbar-link">I'm a chef</p>
                      </Link>
                      <Link>
                            <p className="gc-navbar-link">Messages</p>
                      </Link>
                      <Link>
                          <p className="gc-navbar-link">Bookings</p>
                      </Link>
                  </Nav>

              </Navbar>
              {this.props.children}
          </div>
            )
         }
    }

module.exports = Navigation;