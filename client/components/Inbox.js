/**
 * Created by sachinkaria on 19/03/2017.
 */
import React from 'react';
import { Col, Row, Image, Panel  } from 'react-bootstrap';
import { Link } from 'react-router';
import * as actions from '../actions/messages';
import { connect } from 'react-redux';
import moment from 'moment';


class Inbox extends React.Component{
    constructor(props) {
        super(props);
        this.props.getConversations();
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
    renderContent() {
        if (this.props.inbox) {
            let conversations = this.props.inbox;
            return (
                <div>
                <Col sm={10} smOffset={1} md={8} mdOffset={2} lg={6} lgOffset={3}>
                    <h3 className="gc-profile-heading-md gc-margin-bottom--lg">Inbox</h3>
                            {conversations.map((conversation) => {
                                return (
                                    <Panel key={conversation._id}>
                                    <Link to={'/conversation/' + conversation._id }>
                                            <Col xs={12} sm={3}>
                                                <Image className="gc-thumbnail" src={conversation._recipient.profilePhoto}/>
                                            </Col>
                                            <Col sm={5}>
                                                <p className="gc-profile-text-md">{conversation._recipient.displayName}</p>
                                            </Col>
                                            <Col xs={12} sm={4}>
                                                <p className="gc-text pull-right--t">Last message: {moment(conversation.lastUpdated).format('MMMM Do YYYY')}</p>
                                            </Col>
                                        </Link>
                                    </Panel>
                                )
                            })
                            }
                    </Col>
                </div>
            )
        } else {
            return (<p className="gc-profile-text-md">You have no messages</p>)
        }
    }
}

function mapStateToProps(state) {
    return { inbox: state.user.inbox };
}

export default connect(mapStateToProps, actions)(Inbox);

