import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    }, [navigate]);

    return (
        <div className="logout-container">
            <h2>You have been logged out.</h2>
            <p>Redirecting to login page...</p>
        </div>
    );
};

export default Logout;




// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const Logout = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const logout = async () => {
//             const jwtToken = localStorage.getItem('jwtToken');
//             const adminUserId = localStorage.getItem('adminUserId');

//             if (!jwtToken || !adminUserId) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Unable to log out. No authentication details found.',
//                 });
//                 navigate('/login');
//                 return;
//             }

//             try {
//                 await axios.get(
//                     `${Api_base_url}/v1/logout`,
//                     {
//                         headers: {
//                             'adminUserId': adminUserId,
//                             'jwtToken': jwtToken,
//                         },
//                     }
//                 );

//                 // Clear local storage
//                 localStorage.removeItem('jwtToken');
//                 localStorage.removeItem('adminUserId');

//                 // Show success message
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Logged out',
//                     text: 'You have been logged out successfully.',
//                 });

//                 // Navigate to login page
//                 navigate('/login');
//             } catch (error) {
//                 console.error('Error during logout:', error);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Logout Failed',
//                     text: 'An error occurred during logout. Please try again.',
//                 });
//             }
//         };

//         logout();
//     }, [navigate]);

//     return (
//         <div className="logout-container">
//             <h2>Logging out...</h2>
//         </div>
//     );
// };

// export default Logout;
