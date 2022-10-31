import React from 'react'
import './Payment.css'
import PaymentItem from './PaymentItem'

function PaymentBody() {
  return (
    <div className='PaymentBody'>
        <PaymentItem data= { {name: "Avinash", phone: "9786799765", balance: "2045", id: "12edb2ugs1gd276d"}}/>
    </div>
  )
}

export default PaymentBody