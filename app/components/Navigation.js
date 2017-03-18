let React = require('react');
let ReactRouter = require('react-router');
let Link = ReactRouter.Link;
let Navbar = require('react-bootstrap').Navbar;
let Nav = require('react-bootstrap').Nav;
let Col = require('react-bootstrap').Col;


class Navigation extends React.Component {
  render() {
      return (
          <div className="row">
              <Navbar bsSize="lg" className="gc-navbar">
                  <Col xs={4}>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <Link to="/" className="gc-padding-none">
                              <img className="gc-logo-default" href="#" src="images/logo-icon.png"/>
                              </Link>
                          </Navbar.Brand>
                          <Navbar.Toggle />
                      </Navbar.Header>
                  </Col>
                  <Col xs={4} xsOffset={4} className="gc-vertical-center">
                      <Nav>
                          <Col xs={4}>
                              <Link>
                                  <p>I'm a chef</p>
                              </Link>
                          </Col>
                          <Col xs={4}>
                              <Link>
                                  <p>Messages</p>
                              </Link>
                          </Col>
                          <Col xs={4}>
                              <Link>
                                  <p>Bookings</p>
                              </Link>
                          </Col>
                      </Nav>
                  </Col>
              </Navbar>
              {this.props.children}
          </div>
            )
         }
    }

module.exports = Navigation;