import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../customHooks/useForm'
import auth from '../../sideEffects/apis/auth'


const failure = {
    display: 'block',
    border: '0.5px solid red',
    padding: 10,
    color: 'red'
}

const defaultTo = {
    display: 'none',
}

const passValidator = (password) => {
    const passwordErrors = [];
    if (!(/[A-Z]/.test(password))) {
        passwordErrors.push("The password needs to contain at least one capital letter [A - Z]")
    }
    if (!(/\d/.test(password))) {
        passwordErrors.push("The password needs to contain at least one number")
    }
    if (!(/[!@#\$%^\&\*()_\+\-=[\]{};':"|,.<>\\/?]/.test(password))) {
        passwordErrors.push(`The password needs to contain at least one special character like [ !@#$%^&*()_+-=[]{};':"|,.<>/?]`)
    }
    if (password.length < 6) {
        passwordErrors.push("Password length must be more than six characters in total")
    }
    return passwordErrors
}

const confirmPassValidator = (password, confirmPassword) => password === confirmPassword

const Register = (props) => {

    const firstNameField = useForm('text', '');
    const surNameField = useForm('text', '');
    const phoneNumberField = useForm('tel', '');
    const emailField = useForm('email', '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [successStatus, setSuccessStatus] = useState({ message: '', style: defaultTo })

    const statusMessageHandler = (message, style) => {
        setSuccessStatus({ message, style });
        setTimeout(() => {
            setSuccessStatus({ message: '', style: defaultTo })
        }, 5000);
    }

    const onPasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setErrors(passValidator(passwordValue))
        setConfirmPasswordError(confirmPassValidator(passwordValue, confirmPassword))
    }

    const onConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue)
        setConfirmPasswordError(confirmPassValidator(password, confirmPasswordValue))
    }

    const prepareData = () => {
        return {
            firstName: firstNameField.main.value,
            surName: surNameField.main.value,
            phoneNumber: phoneNumberField.main.value,
            email: emailField.main.value,
            password,
            confirmPassword
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.isBusy(true)
        auth.register(prepareData())
            .then(response => {
                props.url ? props.history.push(props.url) : props.history.push('/')
                props.isBusy(false)
            })
            .catch(err => {
                statusMessageHandler(err.message, failure)
                props.isBusy(false)
            })
    }

    const registerProps = {
        submitForm,
        firstNameField: firstNameField.main,
        surNameField: surNameField.main,
        emailField: emailField.main,
        phoneNumberField: phoneNumberField.main,
        showPassword,
        setShowPassword,
        password,
        onPasswordChange,
        errors,
        confirmPassword,
        onConfirmPasswordChange,
        confirmPasswordError,
        successStatus,
        url: props.url
    }
    return props.user ? <SignedInUser name='registered' /> : <RegisterForm {...registerProps} />
}

export const Login = (props) => {
    const emailField = useForm('email', '');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successStatus, setSuccessStatus] = useState({ message: '', style: defaultTo })
    const statusMessageHandler = (message, style) => {
        setSuccessStatus({ message, style });
        setTimeout(() => {
            setSuccessStatus({ message: '', style: defaultTo })
        }, 5000);
    }
    const login = (data) => {
        props.isBusy(true)
        auth.login(data)
            .then(response => {
                props.url ? props.history.push(props.url) : props.history.push('/')
                props.isBusy(false)
            })
            .catch(err => {
                statusMessageHandler(err.message, failure)
                props.isBusy(false)
            })
    }
    
    const submitForm = (e) => {
        e.preventDefault();
        login({ email: emailField.main.value, password })
    }
    const loginProps = {
        submitForm,
        emailField: emailField.main,
        showPassword,
        setShowPassword,
        password,
        setPassword,
        successStatus,
        url: props.url
    }

    const view = props.user ? <SignedInUser name='logged in' /> : <LoginForm {...loginProps} />

    return view;
}

const LoginForm = (props) => {
    return (
        <form onSubmit={props.submitForm}>
            <div>
                <label>Email: </label>
                <input {...props.emailField} required />
            </div>
            <div>
                <label>
                    {props.showPassword ? 'Hide password' : 'Show password'}
                    <input type='checkbox' onChange={() => props.setShowPassword(!props.showPassword)} checked={props.showPassword} />

                </label>
            </div>
            <div>
                <label>Password: </label>
                <input type={props.showPassword ? 'text' : 'password'}
                    value={props.password} onChange={({ target }) => props.setPassword(target.value)}
                    required />
            </div>
            <Notification {...props.successStatus} />
            <div>
                <button type='submit'>Login</button>
            </div>
            <div>
                <p>
                    New? <Link to={`/register?redirectUrl=${props.url}`}> Register</Link>
                </p>
            </div>
        </form>
    )
}

const RegisterForm = (props) => {
    return (
        <form onSubmit={props.submitForm}>
            <div>
                <label>First name: </label>
                <input {...props.firstNameField} required />
            </div>
            <div>
                <label>Surname: </label>
                <input {...props.surNameField} required />
            </div>
            <div>
                <label>Email: </label>
                <input {...props.emailField} required />
            </div>
            <div>
                <label>Phone number: </label>
                <input {...props.phoneNumberField} required />
            </div>
            <div>
                <label>
                    {props.showPassword ? 'Hide password' : 'Show password'}
                    <input type='checkbox' onChange={() => props.setShowPassword(!props.showPassword)} checked={props.showPassword} />

                </label>
            </div>
            <div>
                <label>Password: </label>
                <input type={props.showPassword ? 'text' : 'password'}
                    className={props.password && props.errors.length > 0 ? 'red-border' : ''}
                    value={props.password} onChange={props.onPasswordChange}
                    required />
            </div>
            {props.errors.map((error, index) => <p key={index} className='text-danger'>{error}</p>)}
            <div>
                <label>Confirm password: </label>
                <input type={props.showPassword ? 'text' : 'password'}
                    className={props.confirmPassword && !props.confirmPasswordError ? 'red-border' : ''}
                    onChange={props.onConfirmPasswordChange} value={props.confirmPassword}
                    required />
            </div>
            {props.confirmPassword && !props.confirmPasswordError && <p className='text-danger'>The password and confirm password do not match</p>}
            <Notification {...props.successStatus} />
            <div>
                {props.errors.length === 0 && props.confirmPasswordError && props.password && props.confirmPassword && <button type='submit'>Register</button>}
            </div>
            <div>
                <p>
                    Already registered?
                    <Link to={`/login?redirectUrl=${props.url}`}> Login</Link>
                </p>
            </div>
        </form>
    )
}


export const Logout = (props) => <button onClick={props.logout}>Logout</button>

const SignedInUser = ({ name }) => (
        <p>Your are already {name}</p>
    )

const Notification = ({ message, style }) => <p style={style}>{message}</p>

export default Register;