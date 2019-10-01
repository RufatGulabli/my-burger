import React from 'react';
import styles from './Input.module.css';

const Input = (props) => {
    let inputClasses = [styles.InputElement];
    (props.invalid && props.touched) ? inputClasses.push(styles.Invalid) : inputClasses.splice(1, 1);

    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case 'textarea':
            inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
            break;
        case 'select':
            inputElement = (
                <select onChange={props.changed} className={styles.InputElement}>
                    {
                        props.elementConfig.options.map(opt =>
                            (<option key={opt.value} value={opt.value}>{opt.showValue}</option>))
                    }
                </select>)
            break;
        default:
            inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <small style={{ color: 'indianred' }}>{props.errorMsg}</small>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input;