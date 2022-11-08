import React from 'react'
import './Billing.css'
import BillingControl from './BillingControl'
import BillingHead from './BillingHead'
import BillItem from './BillItem'
import BillingFoot from './BillingFoot'

function Billing() {
  return (
    <div className='Billing'>
      <div className="billingContent">
        <BillingControl />
        <BillingHead />
        <div className='bill-items'>
          <BillItem />
          <BillItem />
          <BillItem />
          <BillItem />
        </div>
        <BillingFoot />
      </div>
    </div>
  )
}

export default Billing