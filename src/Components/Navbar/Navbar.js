import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.png';
import logoutLogo from '../../images/logout-icon.png';

function Navbar(props) {
  const pathName = props.pathName;
  let navigate = useNavigate();
  const logout = ()=>{
    // localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <nav className='Navbar'>
        <div className='logo'>
            <img src={logo} className='logoImg' alt='Logo'/>
            <h1 className='logoTxt'>VRL Agro</h1>
        </div>
       {pathName === "/login" ? "" : <button onClick={logout}> <img src={logoutLogo} alt=''/> Logout</button>}
    </nav>
  )
}

export default Navbar