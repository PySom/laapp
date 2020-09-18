import React from 'react'
import { Link } from 'react-router-dom'
import { Notification } from './Authentication'



const LoginView = (props) => {
    return (
        <form className="user" onSubmit={props.submitForm}>
            <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
            <div className="form-group">
                <label>Email: </label>
                <input {...props.emailField} placeholder="Enter Email Address..." className="form-control form-control-user" required />
            </div>
            <div className="form-group">
                <div className="custom-control custom-checkbox small">
                    <input type='checkbox' className="custom-control-input" onChange={() => props.setShowPassword(!props.showPassword)} id="customCheck" checked={props.showPassword} />
                    <label className="custom-control-label" htmlFor="customCheck">{props.showPassword ? 'Hide password' : 'Show password'}</label>
                </div>
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type={props.showPassword ? 'text' : 'password'}
                    className="form-control form-control-user"
                    placeholder="password"
                    value={props.password} onChange={({ target }) => props.setPassword(target.value)}
                    required />
            </div>
            <Notification {...props.successStatus} />
            <button className="btn btn-primary btn-user btn-block" type='submit'>Login</button>
            <div>
                <p>
                    New? <Link to={`/register?redirectUrl=${props.url}`}> Register</Link>
                </p>
            </div>
        </form>

    )
}

export default LoginView;
