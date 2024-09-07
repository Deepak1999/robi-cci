import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Api_base_url from '../Api_base_url/BaseUrl';

const ChangePassword = () => {

    // return <h2 style={{textAlign: "center",
    //     marginTop: "15%"}}>Change Password Page</h2>;

    const [inputValue, setInputValue] = useState('');

    const onChangePassword = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const adminUserId = localStorage.getItem('adminUserId');

        if (!inputValue) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter a mobile number.'
            });
            return;
        }

        try {
            const response = await axios.post(
                `${Api_base_url}/change/password`,
                {
                    newPassword: `${inputValue}`,
                },
                {
                    headers: {
                        jwtToken,
                        adminUserId
                    }
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Success',
                // text: `Status check successful: ${JSON.stringify(response.data)}`
                text: response.data.statusDescription.statusMessage,
            });
        } catch (error) {
            console.error('Error during status check:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to check status. Please try again.'
            });
        }
    };

    return (
        <>
            {/* <div>
                <span className="input-prefix">Update Your Password</span>
            </div> */}
            <div className="robi-page" style={{ marginTop: '10%' }}>
                <p><strong>Change Password</strong></p>
                <div className='d-flex'>
                    <div className="input-container">
                        {/* <span className="input-prefix">880</span> */}

                        <div>
                            <input
                                type="password"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                placeholder="Enter you new password"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="input-box number-input"
                            />
                        </div>

                    </div>
                    <div>
                        <button onClick={onChangePassword} className="search-button" style={{ marginTop: "4px", marginLeft: "22px" }}>
                            {/* Update Password */}
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
