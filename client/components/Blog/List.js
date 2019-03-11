/**
 * Created by sachinkaria on 03/06/2018.
 */
import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import '../../images/catering-3.webp';
import { POSTS } from '../../utils/data';
import ListItem from './ListItem';


function List() {
  return (
    <section className="gc-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Get Cooked | Blog</title>
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
                <ListItem
                  title={post.title}
                  image={post.image}
                  src={post.src}
                  date={post.date}
                />
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

