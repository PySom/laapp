import React from 'react'

const AuthLayout = ({ children, submitForm }) => {
    return (
        <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        
    )
}

export default AuthLayout;
