import React from 'react'
import './Payment.css'
import PaymentBody from './PaymentBody'
import PaymentHead from './PaymentHead'

function Payment() {
  return (
    <div className='Payment'>
        <div className='Payment-content'>
            <PaymentHead />
            <PaymentBody />
        </div>
    </div>
  )
}

export default Payment