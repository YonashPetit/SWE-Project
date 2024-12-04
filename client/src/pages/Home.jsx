import React, {useLayoutEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import '../App.css'

function Home({setShowNavbar}) {
  const navigate = useNavigate();
  const loginPage = () => navigate('/login');
  useLayoutEffect(() => {
    setShowNavbar(false);
  }, [])
  return (
    <>
      <div className='center' style={{marginTop: "225px"}}>
        <a href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src={logo} className="logo react" alt="Congregator logo"/>
        </a>
      </div>
      <div className="center" style={{ margin: "auto" }}>
            <button 
                id = "login"
                className="button" 
                onClick={loginPage}
            >
                Login
            </button>
      </div>
      <p className="read-the-docs">
        Your One Stop for all your UF Student Organization Needs!
      </p>
      <a className= "read-the-docs" href = "/adminlogin">
          Admin Login 
      </a>
    </>
  )
}

export default Home
