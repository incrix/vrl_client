import React from 'react'
import './PaymentHead.css'

function PaymentHead() {
  return (
    <div className='PaymentHead'>
        <h6>Name</h6>
        <h6>Phone</h6>
        <h6>Balance</h6>
        <div className='search'>
            <input type='number'  maxLength="10" minLength="10" placeholder='Enter Phone Number' />
            <button>Search</button>
        </div>
    </div>
  )
}

export default PaymentHead