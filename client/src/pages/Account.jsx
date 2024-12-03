import React from 'react';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../pages/Dashboard.css";

function Account({setShowBar}){
    const navigate = useNavigate();
    return (
        <>
        <div className='flex-container'>
          <div className='middle'>
              <h2 id='email'>

              </h2>
              <h2 id='user'>
                
              </h2>
              <h2 id='password'>
                
              </h2>
          </div>
        </div>
        </>
      );
    }
    
    export default Dashboard;
}