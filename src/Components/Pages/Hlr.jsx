import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThreeDots } from 'react-loader-spinner';
import '../CssPages/Robi.css';
import Api_base_url from '../Api_base_url/BaseUrl';

const Hlr = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const onHandleSearchHlr = async () => {
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
        icon: 'warning',
        title: 'Invalid Mobile Number',
        text: 'Invalid Mobile Number! Please Enter Correct Mobile Number.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${Api_base_url}/v1/status/check`,
        {
          number: `${inputValue}`,
          type: 'hlr',
        },
        {
          headers: {
            jwtToken,
            adminUserId,
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.vmsStatus.status,
      });
    } catch (error) {
      console.error('Error during status check:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to check status. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="robi-page" style={{ marginTop: '10%' }}>
      <p><strong>HLR</strong></p>
      <div className='d-flex'>
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
            onClick={onHandleSearchHlr}
            className="search-button"
            style={{
              marginTop: "4px",
              marginLeft: "22px",
            }}
            disabled={loading}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {loading && (
        <div className="loader">
          <ThreeDots color="#00BFFF" height={120} width={120} />
        </div>
      )}
    </div>
  );
};

export default Hlr;
