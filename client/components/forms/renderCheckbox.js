import React from 'react';
import classNames from 'classnames';
import { Checkbox } from 'react-bootstrap';

function renderCheckbox(field) {
  const style = classNames('gc-text gc-text--slim', {
    'gc-capitalize': !field.nonCapitalize
  });

  return (
    <div>
      <Checkbox
        className={style}
        checked={field.checked}
        value="true"
        name={field.input.name}
        onChange={event => field.input.onChange(event)}
      >
        {field.input.name}
      </Checkbox>
    </div>
  )
};


export default renderCheckbox;
