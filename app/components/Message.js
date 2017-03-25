import React from 'react';
import classNames from 'classnames';
import { Row, Col } from 'react-bootstrap';

class Message extends React.Component {
    render() {
        let classes = classNames({
            'message' : true,
            'from-me': this.props.fromMe
        });

        return (
            <Row>
                <Col xs={12}>
                    <div className={classes}>
                        <div className='username'>
                            { this.props.username }
                        </div>
                        <div className='message-body'>
                            { this.props.message }
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}

Message.defaultProps = {
    message: '',
    username: '',
    fromMe: false,
    date: new Date()
};

export default Message;