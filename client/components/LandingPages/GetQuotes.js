import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import Modal from '../../containers/Modal';
import { MODAL } from '../../utils/data';
import BookingForm from '../../containers/BookingForm';

const GetQuotes = (props) => {
  return (
    <div>
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
            onSubmit={props.onSubmit}
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
    </div>
  );
};

export default GetQuotes;
/**
 * Created by sachinkaria on 09/10/2018.
 */
