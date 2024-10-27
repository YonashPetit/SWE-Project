import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Optional: Logout function that could clear session storage and redirect to login
  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard!</h1>
      <p>This is a protected area of the website, accessible only to logged-in users.</p>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
