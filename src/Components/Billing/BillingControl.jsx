import React, { useState } from "react";
import "./BillingControl.css";

function BillingControl({ addBillObject, clearBillItems, scrollToBottom, phoneState, nameState }) {
  const [name, setName] = nameState;
  const [phone, setPhone] = phoneState;
  const [isSearch, setIsSearch] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const token = localStorage.getItem("token");

  const handleSearchClick = (phone, name) => {
    setIsSearch(!isSearch);
    setPhone(phone);
    setName(name);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setPhone(value);
    if(value.length > 0) {
      setIsSearch(true);
    }
    if(value.length === 0) {
      setIsSearch(false);
      return
    }
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
  };

  return (
    <div className="BillingControl">
      <div className="BillingInputField">
        <div className="search">
          <label htmlFor="phone">Customer</label>
          <input
            type="number"
            name="phone"
            placeholder="Enter phone"
            onChange={handleSearch}
            value={phone}
            onBlur={() => {
              setTimeout(() => {
                setCustomerList([]);
                setIsSearch(false);
              }, 100);
            }}
          />
          {isSearch ? <div className="suggestion">
            {customerList &&
              customerList.map((item, index) => {
                return (
                  <div key={index} className="suggestion-item" onClick={( ) => handleSearchClick(item.phone, item.name)}>
                    <p className="cus-name">{item.name}</p>
                    <p className="cus-num">{item.phone}</p>
                  </div>
                );
              })}
          </div> : null}
        </div>
        <div className="customerName search">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="" value={name} onChange={handleName}/>
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
