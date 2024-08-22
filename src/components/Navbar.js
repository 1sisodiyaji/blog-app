import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(false);
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
      <div className="navbar bg-base-100 dark:bg-base-800 md:block hidden">
        <div className="navbar-start">
          <Link to={'/'} className="btn btn-ghost text-xl">Codesaarthi</Link>
        </div>

        <div className="navbar-end space-x-2">
          <input
            type="checkbox"
            className="toggle"
            checked={isDarkMode}
            onChange={handleToggle}
          />
          {user ?
            <>
               <Link to="/profile" className='underline'>Profile</Link>
              <button onClick={handleLogout} className='btn ms-2'>Logout</button>
            </>
            :

            <Link to={'/register'} className="btn">Register</Link>
          }

        </div>
      </div>

      <div className="navbar bg-slate-600 dark:bg-gray-800 md:hidden block text-black dark:text-white">
        <div className="navbar-start">
        <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
       
        <div className="drawer-content"> 
          <label htmlFor="my-drawer-4" className="drawer-button "><i className="fi fi-rr-bars-sort"></i></label>
        </div>
        <div className="drawer-side z-[1]">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
            
          {user ?
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li className='ps-4' onClick={handleLogout}>Logout</li>
              
            </>
            :

            <Link to={'/register'} className="btn">Register</Link>
          }
         
          </ul>
        </div>
      </div> 
        </div>
        <div className='navbar-end'> 
        <input
            type="checkbox"
            className="toggle"
            checked={isDarkMode}
            onChange={handleToggle}
          />
        <Link to={'/'} className="btn btn-ghost text-xl">Codesaarthi</Link>
        </div>
      </div>
    </>
  )
}

export default Navbar