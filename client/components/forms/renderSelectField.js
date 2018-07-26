import React from 'react';
import classNames from 'classnames';

const renderSelectField = (field) => {
  const classes = classNames('form-control gc-input', {
    'gc-input-error': field.meta.touched && field.meta.error,
    'gc-input--clear': field.clear
  });

  return (
    <div className="gc-margin-bottom">
      <div>
        <select className={classes} placeholder={field.placeholder} type={field.type} {...field.input}>
          {field.children}
        </select>
      </div>
      {field.meta.touched && field.meta.error && <div className="gc-red">{field.meta.error}</div>}
    </div>
  );
};

export default renderSelectField;
