import React from 'react';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import Register from '../components/auth/Register';
import Settings from '../containers/forms/setup/chefs/SettingsForm';
import { createReview } from '../actions/reviews';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: null,
      food: null,
      service: null,
      hygiene: null,
      overall: null
    };
    this.baseState = this.state;

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }

  hideModal() {
    this.resetForm();
  }

  showModal() {
    this.setState({ show: true });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      [name]: nextValue
    });
  }

  handleFormSubmit() {
    this.props.createReview(this.state, this.props.id);
  }

  render() {
    const { user, auth } = this.props;
    const primaryColour = '#ff6851';
    const emptyStarColor = '#cecccc';

    return (
      <div>
        <Button className="gc-btn gc-btn-white" onClick={this.showModal}>
                  Write a review
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          bsSize="large"
        >
          <Modal.Header closeButton>
            <Modal.Title className="gc-profile-heading-md gc-center gc-margin-bottom">Leave a review</Modal.Title>
            <Row>
              <Col sm={8} smOffset={2}>
                <p className="gc-center gc-text gc-text--grey">Please fill out the details of your event. This is just a request and you will not be charged until the booking is confirmed and you are invoiced.</p>
              </Col>
            </Row>
          </Modal.Header>
          <Col sm={4} smOffset={4}>
            <Modal.Body>
              {
                (!auth.authenticated && !user.data) &&
                <Register />
              }
              {
                (auth.authenticated && user.data && (!user.data.firstName || !user.data.email || !user.data.mobileNumber)) &&
                <Settings />
              }
              {(auth.authenticated && user.data && user.data.firstName && user.data.email && user.data.mobileNumber) &&
              <form onSubmit={this.handleFormSubmit}>
              <div className="gc-center">
                  <Row>
                    <label className="gc-form-heading">Value</label>
                    <br />
                    <StarRatingComponent
                      className="gc-star-rating"
                      starColor={primaryColour}
                      emptyStarColor={emptyStarColor}
                      name="value"
                      starCount={5}
                      value={this.state.value}
                      onStarClick={this.onStarClick}
                    />
                  </Row>
                  <Row>
                    <label className="gc-form-heading">Food/Drink</label>
                    <br />
                    <StarRatingComponent
                      className="gc-star-rating"
                      starColor={primaryColour}
                      emptyStarColor={emptyStarColor}
                      name="food"
                      starCount={5}
                      value={this.state.food}
                      onStarClick={this.onStarClick}
                    />
                  </Row>
                  <Row>
                    <label className="gc-form-heading">Service</label>
                    <br />
                    <StarRatingComponent
                      className="gc-star-rating"
                      starColor={primaryColour}
                      emptyStarColor={emptyStarColor}
                      name="service"
                      starCount={5}
                      value={this.state.service}
                      onStarClick={this.onStarClick}
                    />
                  </Row>
                  <Row>
                    <label className="gc-form-heading">Cleanliness</label>
                    <br />
                    <StarRatingComponent
                      className="gc-star-rating"
                      starColor={primaryColour}
                      emptyStarColor={emptyStarColor}
                      name="hygiene"
                      starCount={5}
                      value={this.state.hygiene}
                      onStarClick={this.onStarClick}
                    />
                  </Row>
                  <Row>
                    <label className="gc-form-heading">Overall</label>
                    <br />
                    <StarRatingComponent
                      className="gc-star-rating"
                      starColor={primaryColour}
                      emptyStarColor={emptyStarColor}
                      name="overall"
                      starCount={5}
                      value={this.state.overall}
                      onStarClick={this.onStarClick}
                    />
                  </Row>
                  <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
                    Submit review
                  </Button>
                </div>
              </form>

              }
            </Modal.Body>
          </Col>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    chef: state.public.chef
  };
}

export default connect(mapStateToProps, { createReview })(ReviewForm);
