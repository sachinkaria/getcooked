import React from 'react';

const renderInputBox = field => (
    <div>
        <input className="form-control gc-input-box" placeholder={field.placeholder} {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

export default renderInputBox;
