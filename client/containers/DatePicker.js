import React from 'react';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, date: null };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
    this.props.onChange(date);
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    const { focused, date } = this.state;

    return (
      <div className="gc-margin-bottom">
        <SingleDatePicker
          id="date_input"
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          placeholder="Select a Date"
        />
      </div>
    );
  }
}
