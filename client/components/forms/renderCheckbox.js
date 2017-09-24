import React from 'react';
import { Checkbox } from 'react-bootstrap';

const renderCheckbox = field => (
  <div>
    <Checkbox onChange={field.onChange}>
      {field.placeholder}
    </Checkbox>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

export default renderCheckbox;
