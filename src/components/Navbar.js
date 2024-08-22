import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user,setUser] = useState(false);
  useEffect(() => {
    // Check the local storage for theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => { 
    const token = Cookies.get('Codesaarthi-token'); 
    if (token) {
      setUser(true);
    }
  }, []); 

  const handleLogout = () => { 
    Cookies.remove('Codesaarthi-token');  
    window.location.href = '/register'; 
  };
  

  return (
    <>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link>Blogs</Link></li>
         
        {user &&
          <li><Link to = "/profile">Profile</Link></li>
          }
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost text-xl">Codesaarthi</Link>
  </div>
   
  <div className="navbar-end"> 
  <input
            type="checkbox"
            className="toggle"
            checked={isDarkMode}
            onChange={handleToggle}
          />
          {user ?
          <>
            <li><Link to = "/profile">Profile</Link></li>
            <button onClick={handleLogout} className='btn ms-2'>Logout</button>
            </>
          :
        
          <Link to={'/register'} className="btn">Register</Link>
          }
   
  </div>
</div>
    </>
  )
}

export default Navbar