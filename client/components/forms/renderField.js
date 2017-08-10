import React from 'react';

const renderField = field => (
  <div>
    <input className="form-control gc-input gc-margin-bottom" placeholder={field.placeholder} {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

export default renderField;
