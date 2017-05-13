import React from 'react';
import classNames from 'classnames';
import { Row, Col, Panel, Image } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

let Message = (props) =>  {
    let classes = classNames({
        'message' : true,
        'from-me': props.fromMe
    });

    let messageClass = classNames({
        'gc-pull-left': !props.fromMe,
        'gc-pull-right': props.fromMe,
        'gc-text': true,
        'gc-text--xs': true,
        'gc-text--grey': true,
        'gc-margin-none':true
    });

    return (
        <Row>
            <Col xs={12}>
                <div className={classes}>
                    <div className='gc-profile-text-sm gc-message-heading gc-margin-bottom--xs'>
                        <Image className="gc-icon" src={props.image}/>
                    </div>
                    <Panel className='gc-panel-message gc-margin-none'>
                        <Row>
                        <Col>
                            <div className={messageClass}>
                                { moment(props.date).format('MMMM Do YYYY') }
                            </div>
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className='gc-text'>
                                { props.message }
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className={messageClass}>
                                { _.capitalize(props.status) }
                            </div>
                            </Col>
                        </Row>
                    </Panel>
                </div>
            </Col>
        </Row>
    );
};

Message.defaultProps = {
    message: '',
    image: '',
    username: '',
    fromMe: false,
    date: new Date()
};

export default Message;