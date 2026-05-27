import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    return (
        <>
            <div className='container'>

                <div className='row'>
                    <div className='col-md-6 d-flex flex-column justify-content-center pe-5'>
                        <h5 className='fw-semibold mb-3 text-uppercase'>Welcome to</h5><br />
                        <h1 className="display-2 fw-bold mb-4">FinTrack!</h1>

                        <p className="lead text-muted mb-4">
                            Manage your expenses smarter, monitor your spending habits,
                            and take full control of your financial journey with a clean
                            and intuitive platform.
                        </p>

                        <div className="premium-box p-4 rounded-4">
                            <p className="mb-0 fs-5">
                                “Small financial decisions today create
                                stronger financial freedom tomorrow.”
                            </p>
                        </div>
                    </div>
                    <div className='col'>
                        <form>

                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control p-2"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control p-2"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control p-2"
                                    placeholder="Confirm password"
                                />
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary w-100 py-2"
                            >
                                Signup
                            </button>

                            <div className="text-center my-4">
                                <span className="text-muted">OR</span>
                            </div>

                            <div className="d-flex justify-content-center">
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        console.log(jwtDecode(credentialResponse.credential));
                                        navigate('/')
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                    theme="filled_white"
                                    shape="pill"
                                    size="large"
                                    text="continue_with"
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;