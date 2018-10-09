import React from 'react';
import classNames from 'classnames';
import {Button, Row, Col} from 'react-bootstrap';
import GetQuotes from './GetQuotes';

function TextAndImageSection(props) {
  const GREY = props.grey;
  const styles = classNames('gc-section', {
    'gc-section--grey': GREY
  });
  const imageStyle=({
    marginTop: '25px',
    background: `url(${props.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '450px'
  });
  if (props.pushRight) {
    return (
      <section className={styles}>
        <Row>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <Row>
              <Col sm={6} smPush={6}>
                <img
                  style={{width: '100%', paddingTop: '15px'}}
                  alt={props.imageAlt}
                  src={props.imageUrl}
                />
              </Col>
              <Col sm={6} smPull={6}>
                <h3 className="gc-section-heading gc-padding-none">{props.heading}</h3>
                props.text.map(text => <p key={text} className="gc-text gc-text--lg gc-margin-bottom">{text}</p>)
                <br/>
                <GetQuotes onSubmit={props.onSubmit} />
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    )
  }
  return (
    <section className={styles}>
      <Row>
        <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
          <Row>
            <Col style={imageStyle} sm={6}>
            </Col>
            <Col style={{ position: 'relative'}}  sm={6}>
              <h3 className="gc-section-heading gc-padding-none">{props.heading}</h3>
              {props.text.map(text => <p key={text} className="gc-text gc-text--lg gc-margin-bottom">{text}</p>)}
              <Row>
                <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
                  <GetQuotes onSubmit={props.onSubmit} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  )
}

export default TextAndImageSection;
