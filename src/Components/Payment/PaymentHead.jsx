import React,{useState} from 'react'
import './PaymentHead.css'

function PaymentHead({setPaymentList}) {
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
          setPaymentList(data);
        })
        .catch((error) => {
          return(error);
        });
    } else {
      fetch(`${global.config.ROOT_URL}payment/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPaymentList(data);
        })
        .catch((error) => {
         return(error);
        });
    }
  };

  return (
    <div className='PaymentHead'>
        <h6>Name</h6>
        <h6>Phone</h6>
        <h6>Balance</h6>
        <div className='search pay-search'>
            <input type='number'  maxLength="10" minLength="10" placeholder='Enter Phone Number' onChange={(e) => onSearch(e)}/>
        </div>
    </div>
  )
}

export default PaymentHead