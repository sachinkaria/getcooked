import React from 'react';
import classNames from 'classnames';

const renderField = (field) => {
  const classes = classNames('form-control gc-input', {
    'gc-input-error': field.meta.touched && field.meta.error
  });

  return (
    <div className="gc-margin-bottom">
      <input className={classes} placeholder={field.placeholder} type={field.type} {...field.input} />
      {field.meta.touched && field.meta.error && <div className="gc-red">{field.meta.error}</div>}
    </div>
  )
};

export default renderField;
