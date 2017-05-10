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
                <Col sm={6} smOffset={3}>
                    <h3 className="gc-profile-heading-lg">Inbox</h3>
                        <Panel>
                            {conversations.map((conversation) => {
                                return (
                                    <Col>
                                        <Link key={conversation._id} to={'/chat/' + conversation._id }>
                                            <Col className="gc-panel-light" xs={12} sm={3}>
                                                <Image className="gc-thumbnail" src={conversation._recipient.profilePhoto}/>
                                            </Col>
                                            <Col className="gc-panel-light" sm={6}>
                                                <p className="gc-profile-heading-sm">{conversation._recipient.displayName}</p>
                                            </Col>
                                            <Col className="gc-panel-light" xs={12} sm={3}>
                                                <p className="gc-text pull-right--t">{moment(conversation.lastUpdated).format('MMMM Do YYYY')}</p>
                                            </Col>
                                        </Link>
                                    </Col>
                                )
                            })
                            }
                        </Panel>
                    </Col>
                </div>
            )
        } else {
            return (<p className="gc-profile-text-md">You have no messages</p>)
        }
    }
}

function mapStateToProps(state) {
    return { inbox: state.auth.inbox };
}

export default connect(mapStateToProps, actions)(Inbox);

