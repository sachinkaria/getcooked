import React from 'react';
import { SingleDatePicker } from 'react-dates';

let DatePicker = React.createClass ({
    getInitialState: function () {
        return {
            focused: false,
            date: null
        };
    },

    onDateChange: function(date) {
        this.setState({ date });
    }.bind(this),

    onFocusChange: function ({focused}) {
        this.setState({ focused });
    }.bind(this),

    render: function () {
        return (
            <SingleDatePicker
                id="date_input"
                date={this.state.date}
                focused={this.state.focused}
                onDateChange={(date) => { this.setState({ date }); }}
                onFocusChange={({ focused }) => { this.setState({ focused }); }}
                placeholder="Select a Date"
            />
        )
    }
});

module.exports = DatePicker;