import React from "react";
import "./BillingFoot.css";

function BillingFoot() {
  return (
    <div className="BillingFoot">
      <button>Rise Invoice</button>
      <div className="bill-foot flex">
        <div className="amount-paid flex">
          <label>Amount Paid</label>
          <input type="number" />
        </div>
        <div className="grand-total flex">
          <label>Grand Total</label>
          <h6>{"₹ " + 1000}</h6>
        </div>
      </div>
    </div>
  );
}

export default BillingFoot;
