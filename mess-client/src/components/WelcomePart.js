import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WelcomePart() {
  const navigate = useNavigate();
  const uname = localStorage.getItem('uname');
  const token = localStorage.getItem('token');

  const logout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/logout', { token });
      if (res.data.logoutsts === 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('uname');
        navigate('/login');
      } else {
        console.log('Logout failed due to server issue');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <>
      <p>
        Welcome {uname} |{' '}
        <button onClick={logout} style={{ cursor: 'pointer', border: 'none', background: 'none', color: 'blue', textDecoration: 'underline' }}>
          Logout
        </button>
      </p>
    </>
  );
}

export default WelcomePart;
