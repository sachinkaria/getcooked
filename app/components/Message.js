let React = require('react');
let classNames = require('classnames');
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;

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

module.exports = Message;
