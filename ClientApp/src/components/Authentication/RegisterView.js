import React from 'react'
import { Link } from 'react-router-dom'
import { Notification } from './Authentication'

const RegisterView = (props) => {
    return (
        <>
            <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <form className="user" onSubmit={props.submitForm}>
                <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <label>First name: </label>
                        <input {...props.firstNameField} className="form-control form-control-user" placeholder="First Name" required />
                    </div>
                    <div className="col-sm-6">
                        <label>Surname: </label>
                        <input {...props.surNameField} className="form-control form-control-user" placeholder="Surname" required />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <label>Email: </label>
                        <input {...props.emailField} className="form-control form-control-user" placeholder="Email" required />
                    </div>
                    <div className="col-sm-6">
                        <label>Phone number: </label>
                        <input {...props.phoneNumberField} className="form-control form-control-user" placeholder="Phone number" required />
                    </div>
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                        <input type='checkbox' className="custom-control-input" onChange={() => props.setShowPassword(!props.showPassword)} id="customCheck" checked={props.showPassword} />
                        <label className="custom-control-label" htmlFor="customCheck">{props.showPassword ? 'Hide password' : 'Show password'}</label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                        <label>Password: </label>
                        <input type={props.showPassword ? 'text' : 'password'}
                            className={ `${props.password && props.errors.length > 0 ? 'red-border' : '' } form-control form-control-user`}
                            value={props.password} onChange={props.onPasswordChange}
                            required />
                    </div>
                    
                    <div className="col-sm-6">
                        <label>Confirm password: </label>
                        <input type={props.showPassword ? 'text' : 'password'}
                            className={`${props.password && props.errors.length > 0 ? 'red-border' : ''} form-control form-control-user`}
                            onChange={props.onConfirmPasswordChange} value={props.confirmPassword}
                            required />
                    </div>
                </div>
                {props.errors.map((error, index) => <p key={index} className='text-danger'>{error}</p>)}
                {props.confirmPassword && !props.confirmPasswordError && <p className='text-danger'>The password and confirm password do not match</p>}
                <Notification {...props.successStatus} />
                <div>
                    {props.errors.length === 0 && props.confirmPasswordError && props.password && props.confirmPassword && <button className="btn btn-primary btn-user btn-block" type='submit'>Register</button>}
                </div>
                <div>
                    <p>
                        Already registered?
                            <Link to={`/login?redirectUrl=${props.url}`}> Login</Link>
                    </p>
                </div>
            </form>
        </>
    )
}


export default RegisterView