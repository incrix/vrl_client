import React from "react";
import './CustomerHead.css'

function CustomerHead() {
  return (
    <div className="CustomerHead">
      <h6>ID</h6>
      <h6>Name</h6>
      <h6>Phone</h6>
      <div className="search">
        <input
          type="number"
          maxLength="10"
          minLength="10"
          placeholder="Enter Phone Number"
        />
        <button>Search</button>
      </div>
    </div>
  );
}

export default CustomerHead;
