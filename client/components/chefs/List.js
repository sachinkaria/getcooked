import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import SearchBar from '../SearchBar';
import * as actions from '../../actions/public';


class Chefs extends React.Component {
  constructor(props) {
    super(props);
    this.props.listChefs();
  }

  renderContent() {
    if (this.props.chefs) {
      return (
        <div>
          <Row>
            <Col sm={6} smOffset={1} className="gc-margin-bottom">
              <SearchBar />
            </Col>
          </Row>
          <Row>
            <Col xs={10} xsOffset={1} className="gc-padding-none">
              {
                this.props.chefs.map(chef => (
                  <ListItem
                    id={chef._id}
                    key={chef._id}
                    profilePhoto={chef.profilePhoto}
                    name={chef.displayName}
                    rating={chef.rating}
                    endorsements={chef.endorsements}
                    numberOfRatings={chef.numberOfRatings}
                  />
                ))
              }
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { chefs: state.public.chefs };
}

export default connect(mapStateToProps, actions)(Chefs);
