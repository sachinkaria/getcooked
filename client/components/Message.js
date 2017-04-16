import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

let Message = (props) =>  {
        let classes = classNames({
            'message' : true,
            'from-me': props.fromMe
        });
        return (
            <Row>
                <Col xs={12}>
                    <div className={classes}>
                        <div className='username'>
                            { props.username }
                        </div>
                        <div className='message-body'>
                            { props.message }
                        </div>
                    </div>
                </Col>
            </Row>
        );
};

Message.defaultProps = {
    message: '',
    username: '',
    fromMe: false,
    date: new Date()
};

export default Message;