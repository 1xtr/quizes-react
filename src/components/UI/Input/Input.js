import React from 'react'
import classes from './Input.module.sass'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}_${Math.floor(Math.random()*16777215).toString(16)}`
    const cls = [classes.Input]

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Check your data '}</span>
                    : null
            }

        </div>
    )
}

export default Input