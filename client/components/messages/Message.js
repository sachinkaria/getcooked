import React from 'react';
import classNames from 'classnames';
import { Row, Col, Panel, Image } from 'react-bootstrap';

let Message = (props) =>  {
        let classes = classNames({
            'message' : true,
            'from-me': props.fromMe
        });
        return (
            <Row>
                <Col xs={12}>
                    <div className={classes}>
                        <div className='gc-profile-text-sm gc-message-heading gc-margin-bottom--xs'>
                            <Image className="gc-icon" src={props.image}/>
                        </div>
                        <Panel className='gc-panel-message'>
                            <div className='gc-text'>
                                { props.message }
                            </div>
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