import React,{useState, useEffect} from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.png';
import logoutLogo from '../../images/logout-icon.png';
import VerifyAdmin from "../VerifyAdmin";

function Navbar(props) {
  const [isValid, setIsValid] = useState(false);
  const pathName = props.pathName;
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    // eslint-disable-next-line
    setIsValid(VerifyAdmin().then((isValid) => {
      // eslint-disable-next-line
      if (!isValid instanceof Error) {
        return isValid
      }
    }))
    // eslint-disable-next-line
  }, []);
  return (
    <nav className='Navbar'>
        <div className='logo'>
            <img src={logo} className='logoImg' alt='Logo'/>
            <h1 className='logoTxt'>VRL Agro</h1>
        </div>
       {pathName === "/login" || !isValid ? "" : <button onClick={logout}> <img src={logoutLogo} alt=''/> Logout</button>}
    </nav>
  )
}

export default Navbar