import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import BlogThumbnail from '../BlogThumbnail';
import '../../images/carrots.jpg';
import '../../images/catering-3.jpg';

function Blog() {
  return (
    <section className="gc-section gc-section--grey center-m">
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <h3 className="gc-section-heading gc-center">Recent Blog Posts</h3>
          <br />
          <Row>
            <Col xs={12} sm={6}>
              <BlogThumbnail
                backgroundImage="url(/images/catering-3.jpg)"
                heading="7 Things to Consider When Booking a Caterer"
                path={'/blog/7-things-to-consider-when-booking-a-caterer'}
              />
            </Col>
            <Col xs={12} sm={6}>
              <BlogThumbnail
                backgroundImage="url(/images/carrots.jpg)"
                heading=" What is Sustainable Catering?"
                path={'/blog/what-is-sustainable-catering'}
              />
            </Col>
          </Row>
          <Row className="gc-margin-top">
            <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
              <Link to={'/blog'}>
                <Button block className="gc-btn gc-btn--orange">View more</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

export default Blog;

