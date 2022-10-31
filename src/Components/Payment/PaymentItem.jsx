import React from "react";
import './PaymentItem.css'

function PaymentItem(props) {
  const { name, phone, balance } = props.data;
  return (
    <div className="paymentItem">
      <h6>{name}</h6>
      <h6>{phone}</h6>
      <h6>{balance}</h6>
      <div className="paymentInput">
        <div>₹</div>
        <input type="number" placeholder="Enter the amount"/>
        <button>Pay</button>
      </div>
    </div>
  );
}

export default PaymentItem;
