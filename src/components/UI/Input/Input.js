import React from 'react';
import classes from './Input.module.css';

/**
* @author
* @function Input
**/

const Input = (props) => {
    let inputElement = null
    // let inputClass = [classes.InputElement];
    // if (props.invalid && props.touched && props.shouldValidate) {
    //     inputClass.push(classes.Invalid);
    // }

    const inputClass = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClass.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>Please enter a correct value!</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig}
                className={inputClass.join(' ')}
                type={props.elementConfig.type}
                value={props.value}
                onChange={props.changed}
                required={props.required}
            />
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig}
                className={inputClass.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = <select {...props.elementConfig}
                className={inputClass.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(element => (
                    <option key={element.value} value={element.value}>{element.displayValue}</option>
                ))
                }}

            </select>
            break;
        default:
            inputElement = <input {...props.elementConfig}
                className={inputClass.join(' ')} type="text" />
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}

export default Input