import React from 'react';

const renderInputBox = field => (
  <div>
    <textarea className="form-control gc-input" rows={10} placeholder={field.placeholder} {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

export default renderInputBox;
