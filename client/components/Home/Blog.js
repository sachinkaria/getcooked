import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';
import '../../images/carrots.jpg';
import '../../images/catering-3.jpg';

function HowItWorks() {
  const style1 = {
    backgroundImage: 'url(/images/catering-3.jpg)',
    backgroundSize: 'cover',
    height: '240px',
    position: 'relative',
    marginBottom: '10px'
  };
  const style2 = {
    backgroundImage: 'url(/images/carrots.jpg)',
    backgroundSize: 'cover',
    height: '240px',
    position: 'relative'
  };
  return (
    <section className="gc-section center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading gc-center">Recent Blog Posts</h3>
          <br />
          <Row>
            <Col xs={12} sm={6}>
              <Link to={'/blog/7-things-to-consider-when-booking-a-caterer'}>
                <div style={style1}>
                  <div className="gc-position-bottom-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <h4 className="gc-section-heading gc-center gc-white">
                      7 Things to Consider When Booking a Caterer
                    </h4>
                  </div>
                </div>
              </Link>
            </Col>
            <Col xs={12} sm={6}>
              <Link to={'/blog/what-is-sustainable-catering'}>
                <div style={style2}>
                  <div className="gc-position-bottom-fixed" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                    <h4 className="gc-section-heading gc-center gc-white">
                      What is Sustainable Catering?
                    </h4>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default HowItWorks;

