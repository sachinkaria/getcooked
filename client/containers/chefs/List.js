import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import ListItem from '../../components/chefs/ListItem';
import Pagination from '../Pagination';
import * as actions from '../../actions/public';


class Chefs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, currentChefs: [], totalPages: 1 };
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  componentWillMount() {
    this.props.listChefs();
    this.setState({ currentChefs: [] });
  }

  onPageChanged(data) {
    const { chefs } = this.props;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentChefs = chefs.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentChefs, totalPages });
  }

  renderContent() {
    const { currentChefs, currentPage, totalPages } = this.state;
    const { chefs } = this.props;
    const totalChefs = chefs.length;

    if (chefs === 0) return [];
    return (
      <Row>
        <Col xs={10} xsOffset={1} className="gc-padding-none">
          <Row>
            {
              currentChefs.map(chef => (
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
          <div className="text-center gc-margin-top">
            {
              (totalChefs > 0) &&
              <Pagination totalRecords={totalChefs} pageLimit={1} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            }
            { currentPage && (
              <span className="gc-text">
                  Page&nbsp;
                <span className="gc-text gc-text--lg">{ currentPage }</span>
                &nbsp;of&nbsp;
              <span className="gc-text gc-text--lg">{ totalPages }</span>
            </span>
            ) }
          </div>
        </Col>
      </Row>
    );
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
