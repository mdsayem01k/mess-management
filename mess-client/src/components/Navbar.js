import React from 'react'
import './css/Navbar.css'

function Navbar({ theme, setTheme }) {
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className='navbar'>
      <img
        src='https://cdn-icons-png.flaticon.com/512/25/25231.png'
        alt='logo'
        className='logo'
      />
      <ul>
        <li><a href='/home'>Home</a></li>
        <li><a href='/login'>Products</a></li>
        <li><a href='/'>Features</a></li>
        <li><a href='/'>About</a></li>
      </ul>
      <div className='search-box'>
        <input type='text' placeholder='Search...' className='searchinput' />
      </div>

      {/* Toggle theme icon */}
      <img
        onClick={handleThemeToggle}
        src={
          theme === 'light'
            ? 'https://cdn-icons-png.flaticon.com/512/1164/1164954.png' // moon icon
            : 'https://cdn-icons-png.flaticon.com/512/869/869869.png'   // sun icon
        }
        alt='Toggle theme'
        className='toggle-icon'
      />
    </div>
  );
}

export default Navbar;
