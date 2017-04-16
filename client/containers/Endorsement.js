import React from 'react';
import { Label } from 'react-bootstrap';

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

export default Endorsement;