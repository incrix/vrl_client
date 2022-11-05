import React from 'react'
import './ProfilePaymentList.css'

function ProfilePaymentList() {
  return (
    <div className='ProfilePaymentList'>
      <PaymentListItem />
      <PaymentListItem />
      <PaymentListItem />
    </div>
  )
}

function PaymentListItem(){
  return(
    <div className="ListItem">
      <h6>sdnahduqxxksnql</h6>
      <h6>Date: {"12-06-2022"}</h6>
      <h6>Paid: {"₹ " + 200}</h6>
    </div>
  );
}
export default ProfilePaymentList