import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Homepage from './Components/Pages/Homepage';
import SubscriptionDetails from './Components/Pages/SubscriptionDetails';
import ChargeDetails from './Components/Pages/ChargeDetails';
import ChangePassword from './Components/Pages/ChangePassword';
import Robi from './Components/Pages/Robi';
import Hlr from './Components/Pages/Hlr';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import NewUser from './Components/Pages/NewUser';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <HashRouter>
      {isAuthenticated ? <Navbar /> : null}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Homepage onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/subscription-details" element={isAuthenticated ? <SubscriptionDetails /> : <Navigate to="/login" />} />
        <Route path="/subscription-details/robi" element={isAuthenticated ? <Robi /> : <Navigate to="/login" />} />
        <Route path="/subscription-details/hlr" element={isAuthenticated ? <Hlr /> : <Navigate to="/login" />} />
        <Route path="/charge-details" element={isAuthenticated ? <ChargeDetails /> : <Navigate to="/login" />} />
        <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />
        <Route path="/add-user" element={isAuthenticated ? <NewUser /> : <Navigate to="/login" />} />
        <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;




// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Homepage from './Components/Pages/Homepage';
// import SubscriptionDetails from './Components/Pages/SubscriptionDetails';
// import ChargeDetails from './Components/Pages/ChargeDetails';
// import Robi from './Components/Pages/Robi';
// import Hlr from './Components/Pages/Hlr';
// import Login from './Components/Login/Login';
// import Navbar from './Components/Navbar/Navbar';
// import Logout from './Components/Logout/Logout'; // Import the Logout component

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('jwtToken');
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       {isAuthenticated && <Navbar />} {/* Render Navbar only when authenticated */}
//       <Routes>
//         <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
//         <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />} />
//         <Route path="/subscription-details" element={isAuthenticated ? <SubscriptionDetails /> : <Navigate to="/login" />} />
//         <Route path="/subscription-details/robi" element={isAuthenticated ? <Robi /> : <Navigate to="/login" />} />
//         <Route path="/subscription-details/hlr" element={isAuthenticated ? <Hlr /> : <Navigate to="/login" />} />
//         <Route path="/charge-details" element={isAuthenticated ? <ChargeDetails /> : <Navigate to="/login" />} />
//         <Route path="/logout" element={<Logout />} /> {/* Use the Logout component */}
//         <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
