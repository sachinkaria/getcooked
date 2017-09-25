import React from 'react';
import { Checkbox } from 'react-bootstrap';

const renderCheckbox = field => (
  <div>
    <Checkbox value="true" name={field.input.name} onChange={event => field.input.onChange(event)}>
      {field.input.name}
    </Checkbox>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);



export default renderCheckbox;
