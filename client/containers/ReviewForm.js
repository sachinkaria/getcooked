import React from 'react';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import {Button, Modal, Col, Row} from 'react-bootstrap';
import Register from '../components/auth/Register';
import Settings from './forms/setup/chefs/SettingsForm';
import Badge from '../components/Badge';
import {createReview} from '../actions/reviews';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value: null,
      food: null,
      service: null,
      hygiene: null,
      overall: null,
      comment: null
    };
    this.baseState = this.state;
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      [name]: nextValue
    });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  handleChange(event) {
    this.setState({comment: event.target.value});
  }

  handleSubmit() {
    this.props.createReview(this.state, this.props.chefId, this.props.bookingId);
    this.hideModal();
  }

  render() {
    const {user, auth} = this.props;
    const primaryColour = '#ff6851';
    const emptyStarColor = '#e4e2e2';

    return (
      <div>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            {
              (!auth.authenticated && !user.data) &&
              <Register />
            }
            {
              (auth.authenticated && user.data && (!user.data.firstName || !user.data.email || !user.data.mobileNumber)) &&
              <Settings />
            }
            {(auth.authenticated && user.data && user.data.firstName && user.data.email && user.data.mobileNumber) &&
            <div className="gc-center">
              <Row>
                <Col xs={6}>
                  <Badge logo="/images/ingredients.png" />
                  <br/>
                  <label className="gc-profile-heading-sm">Value</label>
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
                </Col>
                <Col xs={6}>
                  <Badge logo="/images/food.png" />
                  <br/>
                  <label className="gc-profile-heading-sm">Food/Drink</label>
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
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <Badge logo="/images/bell.png" />
                  <br/>
                  <label className="gc-profile-heading-sm">Service</label>
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
                </Col>
                <Col xs={6}>
                  <Badge logo="/images/hygiene.png" />
                  <br/>
                  <label className="gc-profile-heading-sm">Cleanliness</label>
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
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Badge logo="/images/quality.png" />
                  <br/>
                  <label className="gc-profile-heading-sm">Overall</label>
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
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <br />
                  <textarea
                    onChange={this.handleChange}
                    placeholder="Enter some useful information about your experience..."
                    rows={4}
                    className="gc-input form-control"
                    name="comment"
                  />
                </Col>
                <Col xs={6} xsOffset={3}>
                  <Button onClick={this.handleSubmit} block type="submit"
                          className="gc-btn gc-btn--orange gc-margin-top">
                    Submit review
                  </Button>
                </Col>
              </Row>
            </div>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}

export default connect(mapStateToProps, { createReview })(ReviewForm);
