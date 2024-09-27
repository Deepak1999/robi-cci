import React, { useState } from 'react';
import bgimg from '../Image/bg-img11.png';
import logoLogin from '../Image/loginLogo.png'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api_base_url from '../Api_base_url/BaseUrl';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(`${Api_base_url}/v1/login`, {
                userName: username,
                password: password
            });

            const { statusDescription, tblUser } = response.data;
            const { statusCode, statusMessage } = statusDescription;

            if (statusCode === 200 && statusMessage === 'Success') {
                if (tblUser.tblUserTokenDetails && tblUser.tblUserTokenDetails.jwtToken) {
                    localStorage.setItem('jwtToken', tblUser.tblUserTokenDetails.jwtToken);
                    localStorage.setItem('adminUserId', tblUser.id);
                    onLogin();
                    navigate('/');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Token not received.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your credentials.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="background-login">
                <img src={bgimg} className="bg-img" alt="Background" style={{ width: "100%", height: "740px", position: "relative" }} />
                <div className="login-form" style={{
                    position: "absolute", top: "150px", right: "160px", border: "2px solid blue",
                    padding: "20px", borderRdius: "10px", width: "32%"
                }}>
                    <div className="login-logo">
                        <img src={logoLogin} className="img-fluid" style={{ width: "100px", marginLeft: "41%" }} alt="Logo" />
                    </div>
                    <h2 className="login-title" style={{ marginLeft: "41%" }}>Login</h2>
                    <form className="login-form-content" onSubmit={handleSubmit}>
                        <div className="form-group mb-4 mt-3">
                            <label htmlFor="username" className="form-label"><strong>Username</strong></label>
                            <input
                                type="text"
                                id="username"
                                className="form-input ms-3"
                                style={{ padding: "8px", width: "79%" }}
                                value={username}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (/^[a-zA-Z0-9]{0,20}$/.test(newValue)) {
                                        setUsername(newValue);
                                    }
                                }}
                                placeholder="Enter your username"
                                maxLength={20}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label"><strong> Password </strong></label>
                            <input
                                type="password"
                                id="password"
                                style={{ padding: "8px", width: "80%" }}
                                className="form-input ms-3 mb-4"
                                value={password}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue.length <= 30) {
                                        setPassword(newValue);
                                    }
                                }}
                                placeholder="Enter your password"
                                maxLength={30}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button btn btn-primary" disabled={loading} style={{
                            width: "296px",
                            marginLeft: "25%", padding: "10px", borderRadius: "50px"
                        }}>
                            {loading ? (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

