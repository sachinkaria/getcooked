let React = require('react');
let { SingleDatePicker } = require('react-dates');
let moment = require('moment');

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
            />
        )
    }
});

module.exports = DatePicker;