// import React, { useState } from 'react';
// import axios from 'axios';
// import { ThreeDots } from 'react-loader-spinner';
// import '../CssPages/ChargeDetails.css';

// const ChargeDetails = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [chargingDetails, setChargingDetails] = useState([]);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [loading, setLoading] = useState(false); // Loader state

//     const onChargingDetails = async () => {
//         const jwtToken = localStorage.getItem('jwtToken');
//         const adminUserId = localStorage.getItem('adminUserId');

//         if (!inputValue) {
//             alert('Please enter a mobile number.');
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 'http://192.168.1.88:5535/charging/details',
//                 {
//                     number: `${inputValue}`,
//                 },
//                 {
//                     headers: {
//                         jwtToken,
//                         adminUserId,
//                     },
//                 }
//             );

//             const { statusDescription, vmsChargingDetails } = response.data.responseWrapper;
//             if (statusDescription.statusCode === 200) {
//                 setChargingDetails(vmsChargingDetails);
//                 setErrorMessage('');
//             } else {
//                 setErrorMessage(statusDescription.statusMessage);
//                 setChargingDetails([]);
//             }
//         } catch (error) {
//             console.error('Error fetching charging details:', error);
//             setErrorMessage('Failed to fetch charging details. Please try again.');
//             setChargingDetails([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="robi-page" style={{ marginTop: '2%' }}>
//             <div className="input-section">
//                 <p>
//                     <strong>Charging Details</strong>
//                 </p>
//                 <div className="d-flex">
//                     <div className="input-container">
//                         <span className="input-prefix">880</span>
//                         <input
//                             type="text"
//                             inputMode="numeric"
//                             pattern="[0-9]*"
//                             placeholder="Enter Mobile number"
//                             value={inputValue}
//                             onChange={(e) => {
//                                 const newValue = e.target.value;
//                                 if (/^\d{0,10}$/.test(newValue)) {
//                                     setInputValue(newValue);
//                                 }
//                             }}
//                             className="input-box number-input"
//                             maxLength={10}
//                         />
//                     </div>
//                     <div>
//                         <button
//                             onClick={onChargingDetails}
//                             className="search-button"
//                             style={{
//                                 marginTop: '4px',
//                                 marginLeft: '22px',
//                             }}
//                             disabled={loading}
//                         >
//                             <i className="fa-solid fa-magnifying-glass"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="error-section">
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}
//             </div>

//             {loading && (
//                 <div className="loader">
//                     <ThreeDots color="#00BFFF" height={120} width={120} />
//                 </div>
//             )}

//             <div className="table-section" style={{ marginTop: "15%", width: "1050px" }}>
//                 {!loading && chargingDetails.length > 0 && (
//                     <div className="table-container">
//                         <table className="charge-details-table">
//                             <thead>
//                                 <tr>
//                                     <th>A Party Number</th>
//                                     <th>B Party Number</th>
//                                     <th>Charged Amount</th>
//                                     {/* <th>Balance Amount</th> */}
//                                     <th>Date & Time</th>
//                                     <th>Messages</th>
//                                     <th>Operator</th>
//                                     <th>Consent</th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {chargingDetails.map((detail, index) => (
//                                     <tr key={index}>
//                                         <td>{detail.aParty}</td>
//                                         <td>{detail.bParty}</td>
//                                         <td>{detail.chargedAmount}</td>
//                                         {/* <td>{detail.balanceAmount}</td> */}
//                                         <td>{detail.dateTime}</td>
//                                         <td>{detail.messages}</td>
//                                         <td>{detail.operator}</td>
//                                         <td>{detail.consent}</td>

//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChargeDetails;



import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';
import '../CssPages/ChargeDetails.css';

const ChargeDetails = () => {
    const [inputValue, setInputValue] = useState('');
    const [chargingDetails, setChargingDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const maskNumber = (number) => {
        if (number.length < 10) {
            return number;
        }
        return `${number.substring(0, 3)}xxxxxx${number.substring(number.length - 2)}`;
    };

    const onChargingDetails = async () => {
        const jwtToken = localStorage.getItem('jwtToken');
        const adminUserId = localStorage.getItem('adminUserId');

        if (!inputValue) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter a mobile number.',
            });
            return;
        }

        if (inputValue.length < 10) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Mobile Number',
                text: 'Please enter a correct mobile number.',
            });
            return;
        }

        setChargingDetails([]);
        setErrorMessage('');
        setLoading(true);

        try {
            const response = await axios.post(
                'http://192.168.1.88:5535/charging/details',
                { number: `${inputValue}` },
                { headers: { jwtToken, adminUserId } }
            );

            const { statusDescription, vmsChargingDetails } = response.data.responseWrapper;
            if (statusDescription.statusCode === 200) {
                setChargingDetails(vmsChargingDetails);
                setCurrentPage(1);
            } else {
                const message = statusDescription.statusMessage || 'Failed to fetch charging details.';
                setErrorMessage(message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                });
                setChargingDetails([]);
            }
        } catch (error) {
            console.error('Error fetching charging details:', error);
            const message = 'Failed to fetch charging details. Please try again.';
            setErrorMessage(message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
            });
            setChargingDetails([]);
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chargingDetails.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(chargingDetails.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div className="robi-page" style={{ marginTop: '2%' }}>
            <div className="input-section">
                <p>
                    <strong>Charging Details</strong>
                </p>
                <div className="d-flex">
                    <div className="input-container">
                        <span className="input-prefix">880</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter Mobile number"
                            value={inputValue}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (/^\d{0,10}$/.test(newValue)) {
                                    setInputValue(newValue);
                                }
                            }}
                            className="input-box number-input"
                            maxLength={10}
                        />
                    </div>
                    <div>
                        <button
                            onClick={onChargingDetails}
                            className="search-button"
                            style={{ marginTop: '4px', marginLeft: '22px' }}
                            disabled={loading}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="error-section">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            {loading && (
                <div className="loader">
                    <ThreeDots color="#00BFFF" height={120} width={120} />
                </div>
            )}

            <div className="table-section" style={{ marginTop: '15%', width: '1050px' }}>
                {!loading && currentItems.length > 0 && (
                    <div className="table-container">
                        <table className="charge-details-table">
                            <thead>
                                <tr>
                                    <th>A Party Number</th>
                                    <th>B Party Number</th>
                                    <th>Charged Amount</th>
                                    <th>Date & Time</th>
                                    <th>Messages</th>
                                    <th>Operator</th>
                                    <th>Consent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.aParty}</td>
                                        <td>{maskNumber(detail.bParty)}</td>
                                        <td>{detail.chargedAmount}</td>
                                        <td>{detail.dateTime}</td>
                                        <td>{detail.messages}</td>
                                        <td>{detail.operator}</td>
                                        <td>{detail.consent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!loading && chargingDetails.length > 0 && (
                <div className="pagination-controls">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="pagination-button"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChargeDetails;


