import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from "../Image/loginLogo.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav>
            <ul className="nav-list">
                <div className='navbar-logo'>
                    <img src={logo} alt='logo-img ' className='img-fluid' style={{ width: "55px" }}></img>
                </div>
                <div className='lists d-flex' style={{ marginLeft: "15%" }}>
                    <li className='my-auto'><Link to="/" className="nav-link"><i className="fa-solid fa-house mx-2"></i>Home</Link></li>
                    <li className="dropdown my-auto" style={{ color: "#61dafb", padding: "8px 16px" }}>
                        <i className="fa-solid fa-list mx-2"></i> Subscription Details
                        <ul className="dropdown-content" style={{ listStyle: "unset" }}>
                            <li><Link to="/subscription-details/robi" className="nav-link" style={{ color: "black" }}>VMS</Link></li>
                            <li><Link to="/subscription-details/hlr" className="nav-link" style={{ color: "black" }}>HLR</Link></li>
                        </ul>
                    </li>
                    <li className='my-auto'><Link to="/charge-details" className="nav-link"><i className="fa-solid fa-circle-info mx-2"></i>Charging Details</Link></li>
                    <li className='my-auto'><Link to="/change-password" className="nav-link"><i className="fa-solid fa-key mx-2"></i>Change Password</Link></li>
                    <li className='my-auto'><Link to="/add-user" className="nav-link"><i className="fa-solid fa-user-plus mx-2"></i>Add User</Link></li>
                    <li onClick={() => {
                        window.location.reload()
                        localStorage.removeItem('jwtToken');
                        navigate('/login');
                    }} className='my-auto'><Link to="/logout" className="nav-link"><i className="fa-solid fa-lock mx-2"></i>Logout</Link></li>
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
