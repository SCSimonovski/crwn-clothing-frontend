import React from "react";

import "./input-form.styles.scss";

const InputForm = ({ label, value, ...otherProps }) => (
    <div className="input-form">
        <input className="input" {...otherProps} />
        <label className={value ? 'label shrink' : `label`}>
            {label}
        </label>
    </div>
);

export default InputForm;