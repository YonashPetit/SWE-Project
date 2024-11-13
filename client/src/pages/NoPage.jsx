import React, {useLayoutEffect} from 'react'
import { Link } from 'react-router-dom';
import notfound from '../assets/images/404.png';
import '../App.css'


function NoPage({setShowNavbar}) {
  useLayoutEffect(() => {
    setShowNavbar(false);
  }, [])
  
  return (
    <>
      <Link to = {"/"}>
        <img src={notfound} alt="Page not found"/>
      </Link>
      <p style={{fontSize: "50px"}}>
          404 Page not Found! 
      </p>
    </>
  )
}

export default NoPage
