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
    <>
    <div className="dashboard">
      <div className="hdashright"> 
        Hi
      </div>
    </div>
    </>
  );
}

export default Dashboard;
