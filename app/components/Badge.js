let React = require('react');
let PropTypes = React.PropTypes;
let Image = require('react-bootstrap').Image;


let Badge = (props) => {
    return (
        <Image className="gc-badge" src={props.logo} circle />
    )
};


Badge.propTypes = {
    logo: PropTypes.string.isRequired
};

module.exports = Badge;
