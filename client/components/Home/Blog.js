import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import BlogThumbnail from '../BlogThumbnail';
import '../../images/carrots.webp';
import '../../images/catering-3.webp';

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
                backgroundImage="url(/images/tableware.webp)"
                heading="5 Things To Consider When Planning Your Catering Budget"
                path={'/blog/5-things-to-consider-when-planning-your-catering-budget'}
              />
            </Col>
            <Col xs={12} sm={6}>
              <BlogThumbnail
                backgroundImage="url(/images/carrots.webp)"
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

