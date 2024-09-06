import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';
import '../CssPages/NewUser.css';

const NewUser = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onHandleAddUser = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const adminUserId = localStorage.getItem('adminUserId');

        if (!userName || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please fill in both the username and password.',
            });
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://192.168.1.88:5535/add/new/user',
                {
                    userName,
                    password,
                },
                {
                    headers: {
                        jwtToken,
                        adminUserId,
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'User added successfully!',
                });
                setUserName('');
                setPassword('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to add the user. Please try again.',
                });
            }
        } catch (error) {
            console.error('Error adding new user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the user. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-user-page">
            <h2>Add New User</h2>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="input-field"
                    maxLength={20}
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    maxLength={40}
                />
                <button
                    onClick={onHandleAddUser}
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? (
                        <ThreeDots color="#00BFFF" height={120} width={120} />
                    ) : (
                        'Add User'
                    )}
                </button>
            </div>
        </div>
    );
};

export default NewUser;
