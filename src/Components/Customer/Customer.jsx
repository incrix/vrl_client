import React ,{useEffect} from 'react'
import CustomerHead from './CustomerHead'
import CustomerBody from './CustomerBody'
import './Customer.css'
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";

function Customer() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isvalid) => {
      if (!isvalid || isvalid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className='Customer'>
        <div className='Customer-content'>
            <CustomerHead />
            <CustomerBody />
        </div>
    </div>
  )
}

export default Customer