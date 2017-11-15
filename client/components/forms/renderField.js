import React from 'react';
import classNames from 'classnames';

const renderField = (field) => {
  const classes = classNames('form-control gc-input', {
    'gc-input-error': field.meta.touched && field.meta.error
  });

  const inputClasses = classNames({
    'gc-flex': field.withAddon
  });

  return (
    <div className="gc-margin-bottom">
      <div className={inputClasses}>
        {field.withAddon && <span className="gc-addon">{field.addonText}</span>}
        <input className={classes} placeholder={field.placeholder} type={field.type} {...field.input} />
      </div>
      {field.meta.touched && field.meta.error && <div className="gc-red">{field.meta.error}</div>}
    </div>
  );
};

export default renderField;
