import React from 'react';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {focused: false, date: null };
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange (date) {
        this.setState({ date: date });
        this.props.onChange();
    }

    onFocusChange ({focused}) {
        this.setState({ focused: focused });
    }

    render () {
        return (
            <SingleDatePicker
                id="date_input"
                date={this.state.date}
                focused={this.state.focused}
                onDateChange={(date) => { this.setState({ date }); this.props.onChange(date); }}
                onFocusChange={({ focused }) => { this.setState({ focused }); }}
                placeholder="Select a Date"
            />
        )
    }
};
