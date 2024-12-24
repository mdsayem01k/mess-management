import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Login = () => {

  const navigate=useNavigate()

  const [userdt, setUserdt] = useState({
    user_email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdt({
      ...userdt,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/user/userlogin', userdt);

      if (res.status === 200) {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('uname',res.data.uname)
        navigate('/home')
      }
    } catch (error) {
      if (error.response) {
        // If there's a response error, extract the message
        setError(error.response.data.msg); // Display error message from backend
      } else {
        setError('An unexpected error occurred.');
      }
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="user_email">Email:</label></td>
              <td>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  value={userdt.user_email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="password">Password:</label></td>
              <td>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={userdt.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <button type="submit">Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* Display success or error messages */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
