import React, {Component} from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from '../../axios/axios-quiz'
import {connect} from 'react-redux'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'E-mail',
                errorMessage: 'E-mail is incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Password is incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            }
        }
    }
    loginHandler = async () => {
        console.log(await this.sendData('login'))
    }

    registerHandler = async () => {
        console.log(await this.sendData('reg'))

    }

    async sendData(type = '') {
        const API_KEY = 'AIzaSyC5zok4r9wI5a7CbPdeAkz-KKhjXGut-yM'
        const regUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` + API_KEY
        const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=` + API_KEY
        const url = type === 'login' ? loginUrl : regUrl
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post(url, authData)
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} className={classes.Auth__form}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Registration
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)