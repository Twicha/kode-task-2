import React from "react";
import classes from "./FormControl.module.scss";
import classNames from "classnames";

const FormControl = ({
    placeholder = "Placeholder",
    id,
    name,
    type = "text",
    label = "Label",
    value = "",
    disabled = false,
    onChange,
}) => {
    return (
        <div className={classNames(classes.FormControl, disabled && classes.Disabled)}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
        </div>
    );
};

export default FormControl;
