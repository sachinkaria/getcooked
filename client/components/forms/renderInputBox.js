import React from 'react';
import classNames from 'classnames';

const renderInputBox = (field) => {
  const classes = classNames('form-control gc-input', {
    'gc-input-error': field.meta.touched && field.meta.error
  });

  return (
    <div className="gc-margin-bottom">
      <textarea className={classes} rows={6} placeholder={field.placeholder} {...field.input} />
      {field.meta.touched && field.meta.error && <div className="gc-red">{field.meta.error}</div>}
    </div>
  )
};

export default renderInputBox;
