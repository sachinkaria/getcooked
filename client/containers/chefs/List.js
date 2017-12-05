import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ListItem from '../../components/chefs/ListItem';
import SearchBar from '../../components/SearchBar';
import * as actions from '../../actions/public';


class Chefs extends React.Component {
  componentWillMount() {
    this.props.listChefs();
  }

  renderContent() {
    if (this.props.chefs) {
      return (
        <div>
          <Row>
            <Col xs={10} xsOffset={1} className="gc-padding-none">
              <Row>
                {
                  this.props.chefs.map(chef => (
                    <ListItem
                      id={chef._id}
                      key={chef._id}
                      profilePhoto={chef.profilePhoto}
                      name={chef.displayName}
                      tagLine={chef.tagLine}
                      rating={chef.rating}
                      endorsements={chef.endorsements}
                      numberOfReviews={chef.numberOfReviews}
                      serviceType={chef.serviceType}
                    />
                  ))
                }
              </Row>
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
