import React from "react";
import "./BillingFoot.css";

function BillingFoot({ grandTotal, amountPaidState, onRiseInvoice }) {
  const {amountPaid, setAmountPaid} = amountPaidState;
  return (
    <div className="BillingFoot">
      <button onClick={onRiseInvoice}>Rise Invoice</button>
      <div className="bill-foot flex">
        <div className="amount-paid flex">
          <label>Amount Paid</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => {
              setAmountPaid(e.target.value);
            }}
          />
        </div>
        <div className="grand-total flex">
          <label>Grand Total</label>
          <h6>{"₹ " + grandTotal}</h6>
        </div>
      </div>
    </div>
  );
}

export default BillingFoot;
