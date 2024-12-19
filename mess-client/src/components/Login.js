import React from 'react';
import styled from 'styled-components';

// Define the styled button component
const StyledBtn = styled.button`
  color: white;
  background-color: red;
  border: 2cdpx solid black;
  font-size: 26px;
  border-radius:5px
`;

const Login = () => {
  return (
    <>
      <div>Login</div>
     
      <StyledBtn>Log in</StyledBtn>
    </>
  );
};

export default Login;
