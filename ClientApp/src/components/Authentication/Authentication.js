import React, { useState } from 'react'
import { useForm } from '../../customHooks/useForm'
import auth from '../../sideEffects/apis/auth'
import { defaultTo, failure, passValidator, confirmPassValidator } from '../../helpers/clientAuth'
import './Auth.css';
import AuthLayout from './AuthLayout';
import LoginView from './LoginView';
import RegisterView from './RegisterView';


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
    return props.user
        ? <SignedInUser name='registered' />
        : (
            <AuthLayout>
                <RegisterView {...registerProps} />
            </AuthLayout>
          )
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

    const view = props.user
        ? <SignedInUser name='logged in' />
        : (
            <AuthLayout>
                <LoginView {...loginProps} />
            </AuthLayout>
          )
        

    return view;
}



export const Logout = (props) =>
    (
    <button onClick={props.logout} className="button-txt">
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Administrator</span>
        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="user profile" />
        
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
        Logout
    </button>)

const SignedInUser = ({ name }) => (
        <p>Your are already {name}</p>
    )

export const Notification = ({ message, style }) => <p style={style}>{message}</p>

export default Register;