import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    let disabled = false;
    if ((typeof props.validForm) === 'boolean') {
        disabled = !props.validForm;
    }
    return (<button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.click} disabled={disabled} {...props}>
        {props.children}
    </button>)
};

export default Button;