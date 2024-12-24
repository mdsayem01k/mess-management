import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [userdt, setUserdt] = useState({
    user_name: '',
    user_email: '',
    password: '',
    gender: '',
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
      const res = await axios.post('http://localhost:5000/api/user/adduser', userdt);
      setSuccess('User registered successfully!');
      console.log(res);
    } catch (error) {
      setError('Error occurred during registration.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="user_name">Name:</label></td>
              <td>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={userdt.user_name}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

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
                  type="password"
                  id="password"
                  name="password"
                  value={userdt.password}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td><label htmlFor="gender">Gender:</label></td>
              <td>
                <select
                  id="gender"
                  name="gender"
                  value={userdt.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <button type="submit">Register</button>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
               If already Register <a href='login'>Login here</a>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* Feedback Messages */}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Registration;
