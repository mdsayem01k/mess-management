


import React from 'react'
import {useNavigate} from 'react-router-dom'
import WelcomePart from './WelcomePart'
function Home() {
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const uname=localStorage.getItem('uname')
    if(!token){
        
        navigate('/login')
    }
  return (
    <div>home

        <WelcomePart/>
    </div>
  )
}

export default Home