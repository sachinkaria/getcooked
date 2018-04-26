import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

class ModalDynamic extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const classes = classNames('gc-btn gc-btn--orange', {
      'gc-btn--lg': this.props.large
    });

    return (
      <div>
        {
          this.props.mobile &&
          <Button block className="gc-btn gc-btn--sticky gc-btn--orange visible-xs" onClick={this.handleShow}>
            {this.props.buttonText}
          </Button>
        }
        {
          (!this.props.mobile && !this.props.navbar) &&
          <Button block className={classes} onClick={this.handleShow}>
            {this.props.buttonText}
          </Button>
        }
        {
          this.props.navbar &&
          <p className="gc-text gc-text--dark-grey" onClick={this.handleShow}>
            {this.props.buttonText}
          </p>
        }

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
            <Row>
              <Col sm={8} smOffset={2}>
                <p className="gc-center gc-text gc-text--grey">
                  {this.props.description}
                </p>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalDynamic;
