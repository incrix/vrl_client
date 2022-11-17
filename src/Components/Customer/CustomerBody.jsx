import React from 'react'
import CustomerItem from './CustomerItem'
import './CustomerBody.css'

function CustomerBody({customerList}) {
  return (
    <div className='CustomerBody'>
      {customerList.length !== 0 ?customerList.map((item)=>{
        return <CustomerItem key={item._id} data= { {name: item.name, phone: item.phone, id: item._id}}/>
      }): <div className='noCustomer'>No Customer Available</div>}
    </div>
  )
}

export default CustomerBody