/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.jpg';
import { POSTS } from '../../utils/data';


function List() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog | Get Cooked</title>
        <link rel="canonical" href="https://www.getcooked.co/blog" />
      </Helmet>
      <Row className="gc-margin-bottom--lg">
        <Col xs={12} md={8} mdOffset={2}>
          <Link to={'/'}>
            <Button className="gc-btn gc-btn--orange">Go Home</Button>
          </Link>
          <h1 className="gc-section-heading gc-padding-none text-center">Blog</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} mdOffset={2}>
          { POSTS.map(post =>
            (
              <div>
                <Row>
                  <Col className="hidden-xs" xs={3}>
                    <img
                      style={{width: '100%', height: 'auto', marginBottom: '20px' }}
                      alt={post.title}
                      src={post.image}
                    />
                  </Col>
                  <Col xs={12} sm={9}>
                    <Link to={post.src}>
                      <h2 className="gc-profile-text-md gc-bold gc-margin-none">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="gc-text gc-bold">{post.date}</p>
                  </Col>
                </Row>
                <hr />
              </div>
            )
          )}
        </Col>
      </Row>
    </section>
  );
}

export default List;

