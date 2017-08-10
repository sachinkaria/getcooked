import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col, Panel, Image } from 'react-bootstrap';
import moment from 'moment';

let Message = (props) =>  {
    let classes = classNames({
        'message' : true,
        'from-me': props.fromMe
    });

    let messageClass = classNames({
        'gc-pull-left': !props.fromMe,
        'gc-pull-right': props.fromMe,
        'gc-text': true,
        'gc-text--sm': true,
        'gc-text--grey': true,
        'gc-margin-none':true
    });

    return (
        <Row>
            <Col xs={12}>
                <div className={classes}>
                    <Col xs={2}>
                        <div className='gc-profile-text-sm gc-message-heading gc-margin-bottom--xs'>
                            <Image className="gc-thumbnail--sm" src={props.image}/>
                        </div>
                    </Col>
                    <Col xs={10}>
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
                        </Panel>
                    </Col>
                </div>
            </Col>
        </Row>
    );
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fromMe: PropTypes.bool.isRequired,
  date: PropTypes.date.isRequired
};

Message.defaultProps = {
    message: '',
    image: '',
    username: '',
    fromMe: false,
    date: new Date()
};

export default Message;