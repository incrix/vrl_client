import React from "react";
import "./BillingControl.css";

function BillingControl({
  addBillObject,
  clearBillItems,
  scrollToBottom
}) {
  return (
    <div className="BillingControl">
      <div className="BillingInputField">
        <div className="search">
          <label htmlFor="phone">Customer</label>
          <input type="number" name="phone" placeholder="Enter phone" />
        </div>
        <div className="customerName search">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="" />
        </div>
      </div>
      <div className="buttonControl">
        <button className="clear" onClick={clearBillItems}>
          Clear
        </button>
        <button
          onClick={() => {
            addBillObject();
            scrollToBottom();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default BillingControl;
