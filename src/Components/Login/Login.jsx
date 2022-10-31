import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'

function Login() {
  return (
    <div className='LoginSec'>
        <div className='loginForm'>
            <h4 className='loginTitle'>Welcome!</h4>
            <div className='inputField'>
                <input type='text' placeholder='Username' />
                <input type='password' placeholder='Password' />
            </div>
            <Link className='login' to='/'>Login</Link>
        </div>
    </div>
  )
}

export default Login