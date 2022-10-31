import React from 'react'
import './Navbar.css'
import logo from '../../images/logo.png';

function Navbar() {
  return (
    <nav className='Navbar'>
        <div className='logo'>
            <img src={logo} className='logoImg' alt='Logo'/>
            <h1 className='logoTxt'>VRL Agro</h1>
        </div>

    </nav>
  )
}

export default Navbar