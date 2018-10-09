import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import GetQuotes from './GetQuotes';

function MainSection(props) {
  const style = {
    backgroundImage: `url(${props.image})`,
    backgroundSize: 'cover'
  };
  return (
    <div>
      <section style={style} className="gc-section gc-section--main text-left">
        <Row style={{paddingTop: '85px'}}>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h1 className="gc-title">{props.title}</h1>
            <h2 className="gc-heading gc-white">{props.subtitle}</h2>
            <div className="gc-margin-bottom gc-padding-none">
              <div className="gc-center">
                <Row style={{paddingBottom: '60px', paddingTop: '25px'}}>
                  <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                    <GetQuotes onSubmit={props.onSubmit} />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default MainSection;
