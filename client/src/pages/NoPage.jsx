import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import '../App.css'

function NoPage() {

  return (
    <>
      <div>
        <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={logo} className="logo react" alt="Congregator logo" />
        </a>
      </div>
      <p className="read-the-docs">
        Your One Stop for all your UF Student Organization Needs!
      </p>
    </>
  )
}

export default NoPage
