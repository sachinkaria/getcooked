import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import BookingForm from '../../containers/BookingForm';
import Modal from '../../containers/Modal';
import { MODAL } from '../../utils/data';

function Main({ eventSubmit, chefs }) {
  const style = {
    backgroundImage: 'url(/images/dining.jpg)',
    backgroundSize: 'cover'
  };
  return (
    <div>
      <section style={style} className="gc-section gc-section--main text-left">
        <Row style={{ paddingTop: '85px' }}>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <h1 className="gc-title">Get Cooked</h1>
            <h2 className="gc-heading gc-white">Compare and Book the Best Caterers and Private Chefs in London.</h2>
            <div className="gc-margin-bottom gc-padding-none">
              <div className="gc-center">
                <Row style={{ paddingBottom: '60px', paddingTop: '25px' }}>
                  <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                    <div className="hidden-xs">
                      <Modal
                        large
                        title={MODAL.TITLE}
                        description={MODAL.DESCRIPTION}
                        buttonText={MODAL.ACTION}
                        onClick={heap.track('Click Get Quotes')}
                      >
                        <BookingForm
                          withoutChef
                          onSubmit={eventSubmit}
                          large
                          action="Get Quotes"
                        />
                      </Modal>
                    </div>
                    <div className="visible-xs">
                      <Link to={'/get-quotes'}>
                        <Button block className="gc-btn gc-btn--orange gc-btn--lg">
                          Get Quotes
                        </Button>
                      </Link>
                    </div>
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

export default Main;

