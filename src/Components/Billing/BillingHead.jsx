import React from 'react'
import './BillingHead.css'

function BillingHead() {
  return (
    <div className='BillingHead'>
        <h6 className='sno'>S.No</h6>
        <h6 className='bill-product'>Product</h6>
        <h6 className='bill-quantity'>Quantity</h6>
        <h6 className='bill-price'>Price</h6>
        <h6 className='bill-delete'>Delete</h6>
        <h6 className='bill-total'>Total</h6>
    </div>
  )
}

export default BillingHead