let React = require('react');
let Label = require('react-bootstrap').Label;

let Endorsement = React.createClass ({
    getInitialState: function () {
        return {
            description: this.props.description,
            number: this.props.number
        };
    },

    addEndorsement: function() {
        this.setState(
            {number: this.state.number +1}
        )
    },
    render: function () {
        return (
            <p className="gc-endorsement gc-profile-text-md" onClick={this.addEndorsement}>
                <Label>
                    {this.state.description} {this.state.number}
                </Label>
            </p>
        )
    }
});

module.exports = Endorsement;