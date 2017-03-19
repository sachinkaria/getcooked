/**
 * Created by sachinkaria on 18/03/2017.
 */
let React = require('react');

class Message extends React.Component {
    render() {
        // Was the message sent by the current user. If so, add a css class
        const fromMe = this.props.fromMe ? 'from-me' : '';

        return (
            <div className={`message ${fromMe}`}>
                <div className='username'>
                    { this.props.username }
                </div>
                <div className='message-body'>
                    { this.props.message }
                </div>
            </div>
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
