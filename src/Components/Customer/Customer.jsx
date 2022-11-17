import React ,{useEffect, useState} from 'react'
import CustomerHead from './CustomerHead'
import CustomerBody from './CustomerBody'
import './Customer.css'
import { useNavigate } from "react-router-dom";
import VerifyAdmin from "../VerifyAdmin";

function Customer() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [customerList, setCustomerList] = useState([])
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    VerifyAdmin().then((isValid) => {
      if (!isValid || isValid instanceof Error) {
        navigate("/login");
      }
    });
    // eslint-disable-next-line
  }, []);


  useEffect(()=>{
    fetch(`${global.config.ROOT_URL}customer/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setCustomerList(data)
    })
    .catch((error) => {
      console.log(error)
    });
    // eslint-disable-next-line
  },[])



  return (
    <div className='Customer'>
        <div className='Customer-content'>
            <CustomerHead setCustomerList={setCustomerList}/>
            <CustomerBody customerList={customerList}/>
        </div>
    </div>
  )
}


export default Customer