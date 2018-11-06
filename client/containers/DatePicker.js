import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, date: this.props.date || null };
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.isSameDay = this.isSameDay.bind(this);
  }

  onDateChange(date) {
    this.setState({ date });
    this.props.onChange(date);
  }

  onFocusChange({ focused }) {
    this.setState({ focused });
  }

  isSameDay(a, b) {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    // Compare least significant, most likely to change units first
    // Moment's isSame clones moment inputs and is a tad slow
    return a.date() === b.date()
      && a.month() === b.month()
      && a.year() === b.year();
  }

  render() {
    const { focused, date } = this.state;
    const CHRISTMAS_DAY = moment([2018, 11, 25]);

    return (
      <div className="gc-margin-bottom">
        <SingleDatePicker
          id="date_input"
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          placeholder="Select a Date"
          numberOfMonths={1}
          isDayBlocked={day1 => this.isSameDay(day1, CHRISTMAS_DAY)}
        />
      </div>
    );
  }
}
