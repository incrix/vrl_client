import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomerItem.css'


function CustomerItem(props) {
  const { name, phone, id } = props.data;
  
  let navigate = useNavigate();
  const routeCustomer = ()=>{
    navigate(`/customer/${id}`);
  }
  return (
    <div className='CustomerItem'>
      <h6>{id}</h6>
      <h6>{name}</h6>
      <h6>{phone}</h6>
      <button onClick={routeCustomer}>View</button>
    </div>
  )
}

export default CustomerItem