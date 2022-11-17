import React, { useState } from "react";
import "./CustomerHead.css";

function CustomerHead({ setCustomerList }) {
  // eslint-disable-next-line 
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const onSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value !== "") {
      fetch(`${global.config.ROOT_URL}customer/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setCustomerList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`${global.config.ROOT_URL}customer/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCustomerList(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

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
          onChange={(e) => onSearch(e)}
        />
      </div>
    </div>
  );
}

export default CustomerHead;
